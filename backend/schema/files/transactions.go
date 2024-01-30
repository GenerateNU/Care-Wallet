package files

import (
	"carewallet/models"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"

	"github.com/aws/aws-sdk-go/service/s3"

	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jackc/pgx"
)

var AWS_BUCKET_NAME = "care-wallet-storage"

func UploadFile(pool *pgx.Conn, file models.File, data *multipart.FileHeader, reader io.Reader) error {
	file.FileName = data.Filename
	file.UploadDate = time.Now().Format("2006-01-02 15:04:05")

	// Check if the file size is greater than 5 MB
	if data.Size > 5000000 {
		fmt.Println("maximum file size 5 MB")
		return errors.New("maximum file size 5 MB")
	}

	// Insert file into database
	err := pool.QueryRow("INSERT INTO files (file_name, group_id, upload_by, upload_date, file_size) VALUES ($1, $2, $3, $4, $5) RETURNING file_id;",
		file.FileName, file.GroupID, file.UploadBy, file.UploadDate, data.Size).Scan(&file.FileID)
	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	// Create the AWS object key, upload the file to S3
	objectKey := fmt.Sprintf("%v-%v", file.GroupID, file.FileName)
	dotIndex := strings.LastIndex(objectKey, ".")
	file_substring := objectKey[:dotIndex]
	file_extension := objectKey[dotIndex:]

	aws_key := file_substring + strconv.Itoa(file.FileID) + file_extension

	sess, err := createAWSSession()
	if err != nil {
		fmt.Println(err.Error())
		return err
	}
	
	uploader := s3manager.NewUploader(sess)
	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(aws_key),
		Body:   reader,
	})

	if err != nil {
		_, err := pool.Exec("DELETE FROM files WHERE file_id = $1", file.FileID)
		if err != nil {
			fmt.Println(err.Error())
			return err
		}
		fmt.Println(err.Error())
		return err
	}

	return nil
}

func DeleteFile(pool *pgx.Conn, fName string, s3Only bool) error {
	// Create AWS session
	sess, err := createAWSSession()
	if err != nil {
		return errors.New("failed to create AWS session")
	}

	// Create S3 service client
	svc := s3.New(sess)

	// Delete file from S3
	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(fName),
	})
	if err != nil {
		return errors.New("failed to delete file from AWS")
	}

	// Delete file from the database
	if !s3Only {
		_, err := pool.Exec("DELETE FROM files WHERE file_name = $1", fName)
		if err != nil {
			return errors.New("failed to find file in database")
		}
	}

	return nil
}
