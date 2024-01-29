package files

import (
	"carewallet/models"
	"errors"
	"io"
	"os"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"

	"github.com/aws/aws-sdk-go/service/s3"

	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jackc/pgx"
)

var AWS_BUCKET_NAME = "care-wallet-storage"

func createAWSSession() (*session.Session, error) {
	// Could cache session to avoid making a new one every time
	access_key, access_exists := os.LookupEnv("AWS_ACCESS_KEY")
	secret_key, secret_exists := os.LookupEnv("AWS_SECRET_KEY")

	var err error
	if access_exists && secret_exists {
		sess, err := session.NewSession(&aws.Config{
			Region:      aws.String("us-east-1"),
			Credentials: credentials.NewStaticCredentials(access_key, secret_key, ""),
		})

		if err != nil {
			return nil, err
		}

		return sess, nil
	}

	return nil, err
}

func UploadFile(pool *pgx.Conn, file models.File, reader io.Reader) error {
	// Upload the file to the S3 bucket
	sess, err := createAWSSession()
	if err != nil {
		return errors.New("Failed to create AWS session")
	}

	uploader := s3manager.NewUploader(sess)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(file.FileName),
		Body:   reader,
	})
	if err != nil {
		return errors.New(err.Error())
	}

	// Add file to database, delete from S3 if it can't be made
	// TODO update based on file model when confirmed
	query := `INSERT INTO files (group_id, upload_by, upload_date) VALUES ($1, $2, $3)`
	_, err = pool.Exec(query, strconv.Itoa(file.GroupID), strconv.Itoa(file.UploadBy), file.UploadDate)
	if err != nil {
		fileIDStr := strconv.Itoa(file.FileID)
		DeleteFile(pool, fileIDStr, false)
		return errors.New(err.Error())
	}

	return nil
}

func DeleteFile(pool *pgx.Conn, fName string, s3Only bool) error {
	var test_file models.File

	// Create AWS session
	sess, err := createAWSSession()
	if err != nil {
		return errors.New("Failed to create AWS session")
	}

	// Create S3 service client
	svc := s3.New(sess)

	// Delete file from S3
	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(test_file.FileName),
	})
	if err != nil {
		return errors.New("Failed to delete file from AWS")
	}

	// Delete file from the database
	if !s3Only {
		_, err := pool.Exec("DELETE FROM files WHERE file_name = $1", fName)
		if err != nil {
			return errors.New("Failed to delete file from database")
		}
	}

	return nil
}
