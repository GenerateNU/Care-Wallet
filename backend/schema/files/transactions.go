package files

import (
	"carewallet/models"
	"errors"
	"io"
	"os"

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
			Region:      aws.String("us-east-2"),
			Credentials: credentials.NewStaticCredentials(access_key, secret_key, ""),
		})

		if err != nil {
			return nil, err
		}

		return sess, nil
	}

	return nil, err
}

func UploadFile(pool *pgx.Conn, userID string, file models.File, reader io.Reader) error {
	// Upload the file to the S3 bucket
	sess, err := createAWSSession()
	if err != nil {
		return errors.New("failed to create AWS session")
	}

	uploader := s3manager.NewUploader(sess)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(file.FileName),
		Body:   reader,
	})
	if err != nil {
		return errors.New("failed to upload file to S3 bucket")
	}

	// TODO Add file to database, delete from S3 if it can't be made

	return nil
}


func DeleteFile(pool *pgx.Conn, id string, s3Only bool) error {
	var test_file models.File

	// Query file from the database
	err := pool.QueryRow("SELECT file_name FROM files WHERE id = $1", id).Scan(&test_file.FileName)
	if err != nil {
		return err
	}

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
		_, err := pool.Exec("DELETE FROM files WHERE id = $1", id)
		if err != nil {
			return errors.New("Failed to find file in database")
		}
	}

	return nil
}