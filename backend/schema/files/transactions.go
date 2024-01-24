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
)

var AWS_BUCKET_NAME = "care-wallet-storage"

// TODO: Lock IN! lock inn
func createAWSSession() (*session.Session, error) {
	// TODO: cache session to avoid making a new one every time
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

func UploadFile(file models.File, reader io.Reader) error {
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

	// TODO: Add the file to database, delete from S3 if it can't be made

	return nil
}

func DeleteFile(file models.File, id string, s3Only bool) error {
	// TODO: Add error check for db (legacy johnson)

	// Create session yas
	sess, err := createAWSSession()
	if err != nil {
		return errors.New("failed to create AWS session")
	}

	svc := s3.New(sess)

	// Delete file from S3 (key is file name?)
	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(file.FileName),
	})
	if err != nil {
		return errors.New("failed to delete file from S3")
	}

	// TODO: Delete file from database if s3Only is false

	return nil
}
