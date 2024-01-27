package files

import (
	"carewallet/models"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"strconv"
	"strings"

	"github.com/aws/aws-sdk-go/aws"

	"github.com/aws/aws-sdk-go/service/s3"

	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jackc/pgx"
)

var AWS_BUCKET_NAME = "care-wallet-storage"

// TODO: Add Group ID support
// TODO: Add Task ID support
// TODO: Add Date/Time Support
// TODO: Add Uploaded By Support
// TODO: Can this be cleaned up at all?
func UploadFile(pool *pgx.Conn, file models.File, data *multipart.FileHeader, reader io.Reader) error {
	file.FileName = data.Filename

	// Check if the file size is greater than 5 MB
	if data.Size > 5000000 {
		fmt.Println("maximum file size 5 MB")
		return errors.New("maximum file size 5 MB")
	}

	sess, err := createAWSSession()
	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	err = pool.QueryRow("INSERT INTO files (file_name, group_id, upload_by, file_size, object_key) VALUES ($1, $2, $3, $4, $5) RETURNING file_id;",
		file.FileName, "test-group", "test-user", data.Size, "temp-objectkey").Scan(&file.FileID)

	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	uploader := s3manager.NewUploader(sess)

	objectKey := fmt.Sprintf("%v-%v", file.GroupID, file.FileName)
	dotIndex := strings.LastIndex(objectKey, ".")
	file_substring := objectKey[:dotIndex]
	file_extension := objectKey[dotIndex:]

	file.ObjectKey = file_substring + strconv.Itoa(file.FileID) + file_extension

	_, err = pool.Exec("UPDATE files SET object_key = $1", file.ObjectKey)

	if err != nil {
		_, err2 := pool.Exec("DELETE FROM files WHERE file_id = $1", file.FileID)
		if err2 != nil {
			fmt.Println(err2.Error())
			return err2
		}
		fmt.Println(err.Error())
		return err
	}

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(file.ObjectKey),
		Body:   reader,
	})

	if err != nil {
		_, err2 := pool.Exec("DELETE FROM files WHERE file_id = $1", file.FileID)
		if err2 != nil {
			fmt.Println(err2.Error())
			return err2
		}
		fmt.Println(err.Error())
		return err
	}

	return nil
}

func DeleteFile(pool *pgx.Conn, id string, s3Only bool) error {
	var test_file models.File

	// Query file from the database
	err := pool.QueryRow("SELECT file_name FROM files WHERE group_id = $1", id).Scan(&test_file.FileName)
	if err != nil {
		return err
	}

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
		Key:    aws.String(test_file.FileName),
	})
	if err != nil {
		return errors.New("failed to delete file from AWS")
	}

	// Delete file from the database
	if !s3Only {
		_, err := pool.Exec("DELETE FROM files WHERE group_id = $1", id)
		if err != nil {
			return errors.New("failed to find file in database")
		}
	}

	return nil
}
