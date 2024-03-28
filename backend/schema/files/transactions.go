package files

import (
	"carewallet/models"
	"context"
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
	"github.com/jackc/pgx/v5/pgxpool"
)

var AWS_BUCKET_NAME = "care-wallet-storage"

func UploadFile(pool *pgxpool.Pool, file models.File, data *multipart.FileHeader, reader io.Reader) error {
	file.FileName = data.Filename
	file.UploadDate = time.Now().Format("2006-01-02 15:04:05")

	// Check if the file size is greater than 5 MB
	if data.Size > 5000000 {
		fmt.Println("maximum file size 5 MB")
		return errors.New("maximum file size 5 MB")
	}

	// Insert file into database
	err := pool.QueryRow(context.Background(), "INSERT INTO files (file_name, group_id, upload_by, upload_date, file_size) VALUES ($1, $2, $3, $4, $5) RETURNING file_id;",
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
		_, err := pool.Exec(context.Background(), "DELETE FROM files WHERE file_id = $1", file.FileID)
		if err != nil {
			fmt.Println(err.Error())
			return err
		}
		return err
	}

	return nil
}

func RemoveFile(pool *pgxpool.Pool, fileID string) error {
    var groupID int
    var fileName string

    // Retrieve groupID and fileName from the database using fileID
    err := pool.QueryRow(context.Background(), "SELECT group_id, file_name FROM files WHERE file_id = $1", fileID).Scan(&groupID, &fileName)
    if err != nil {
        fmt.Println(err.Error())
        return err // Handle error, e.g., fileID not found
    }

    // Recreate the AWS S3 object key using the same method as during upload
    objectKey := fmt.Sprintf("%v-%v", groupID, fileName)
    dotIndex := strings.LastIndex(objectKey, ".")
    fileSubstring := objectKey[:dotIndex]
    fileExtension := objectKey[dotIndex:]
    awsKey := fileSubstring + strconv.Itoa(groupID) + fileExtension

    // Now proceed with the S3 deletion using awsKey as you did with upload
    sess, err := createAWSSession()
    if err != nil {
        fmt.Println(err.Error())
        return err
    }

    svc := s3.New(sess)
    _, err = svc.DeleteObject(&s3.DeleteObjectInput{
        Bucket: aws.String(AWS_BUCKET_NAME),
        Key:    aws.String(awsKey),
    })
    if err != nil {
        fmt.Println(err.Error())
        return err // S3 deletion failed
    }

    // Assuming the S3 object deletion was successful, delete the record from the database
    _, err = pool.Exec(context.Background(), "DELETE FROM files WHERE file_id = $1", fileID)
    if err != nil {
        fmt.Println(err.Error())
        return err // Database deletion failed
    }

    return nil // Success
}

func GetFileURL(pool *pgxpool.Pool, fileID string) (string, error) {
    var groupID int
    var fileName string

    // Retrieve groupID and fileName from the database using fileID
    err := pool.QueryRow(context.Background(), "SELECT group_id, file_name FROM files WHERE file_id = $1", fileID).Scan(&groupID, &fileName)
    if err != nil {
        return "", fmt.Errorf("error retrieving file information from database: %w", err)
    }

    // Recreate the AWS S3 object key using the same method as during upload
    objectKey := fmt.Sprintf("%v-%v", groupID, fileName)
    dotIndex := strings.LastIndex(objectKey, ".")
    fileSubstring := objectKey[:dotIndex]
    fileExtension := objectKey[dotIndex:]
    awsKey := fileSubstring + strconv.Itoa(groupID) + fileExtension

    // Now, use awsKey to generate the presigned URL
    sess, err := createAWSSession()
    if err != nil {
        return "", fmt.Errorf("error creating AWS session: %w", err)
    }

    svc := s3.New(sess)

    // Generate a presigned URL
    req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
        Bucket: aws.String(AWS_BUCKET_NAME),
        Key:    aws.String(awsKey),
    })
    urlStr, err := req.Presign(15 * time.Minute) // URL expires after 15 minutes
    if err != nil {
        return "", fmt.Errorf("error generating presigned URL: %w", err)
    }

    return urlStr, nil
}
