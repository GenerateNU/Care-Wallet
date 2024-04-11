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

func uploadFile(pool *pgxpool.Pool, file models.File, data *multipart.FileHeader, reader io.Reader) error {
	file.FileName = data.Filename
	file.UploadDate = time.Now().Format("2006-01-02 15:04:05")

	// Check if the file size is greater than 5 MB
	if data.Size > 5000000 {
		fmt.Println("maximum file size 5 MB")
		return errors.New("maximum file size 5 MB")
	}

	// Insert file into database
	err := pool.QueryRow(context.Background(), "INSERT INTO files (file_name, group_id, upload_by, upload_date, file_size, notes, label_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING file_id;",
		file.FileName, file.GroupID, file.UploadBy, file.UploadDate, data.Size, file.Notes, file.LabelName).Scan(&file.FileID)
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

func RemoveFile(pool *pgxpool.Pool, groupID string, fileName string) error {
	groupIDInt, err := strconv.Atoi(groupID)
	if err != nil {
		return fmt.Errorf("invalid groupID: %w", err)
	}

	var fileID int
	err = pool.QueryRow(context.Background(), "SELECT file_id FROM files WHERE group_id = $1 AND file_name = $2", groupIDInt, fileName).Scan(&fileID)
	if err != nil {
		return fmt.Errorf("file not found in database for deletion: %w", err)
	}

	objectKey := fmt.Sprintf("%v-%v-%d", groupIDInt, fileName, fileID) // Match the key format used in upload

	sess, err := createAWSSession() // Reuse your secure session initialization logic
	if err != nil {
		return fmt.Errorf("error creating AWS session: %w", err)
	}

	svc := s3.New(sess)
	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(objectKey),
	})
	if err != nil {
		return fmt.Errorf("error deleting S3 object: %w", err)
	}

	_, err = pool.Exec(context.Background(), "DELETE FROM files WHERE file_id = $1", fileID)
	if err != nil {
		return fmt.Errorf("error deleting file record from database: %w", err)
	}

	return nil // Success
}

func GetFileURL(pool *pgxpool.Pool, groupID string, fileName string) (string, error) {

	//Convert groupID to int for consistency in key construction
	groupIDInt, err := strconv.Atoi(groupID)
	if err != nil {
		fmt.Println(err.Error())
		return "", fmt.Errorf("invalid groupID: %w", err)
	}

	//Assuming FileID is used to create a unique object key
	var fileID int
	err = pool.QueryRow(context.Background(), "SELECT file_id FROM files WHERE group_id = $1 AND file_name = $2", groupIDInt, fileName).Scan(&fileID)
	if err != nil {
		fmt.Println(err.Error())
		return "", fmt.Errorf("file not found in database: %w", err)
	}

	// Create the AWS object key, upload the file to S3
	objectKey := fmt.Sprintf("%v-%v", groupID, fileName)
	dotIndex := strings.LastIndex(objectKey, ".")
	file_substring := objectKey[:dotIndex]
	file_extension := objectKey[dotIndex:]

	aws_key := file_substring + strconv.Itoa(fileID) + file_extension

	sess, err := createAWSSession() // Ensure this function securely initializes AWS session
	if err != nil {
		fmt.Println(err.Error())
		return "", fmt.Errorf("error creating AWS session: %w", err)
	}

	svc := s3.New(sess)
	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(AWS_BUCKET_NAME),
		Key:    aws.String(aws_key),
	})

	expiration := time.Duration(24*time.Hour) * time.Duration(1)
	urlStr, err := req.Presign(expiration) // URL expires after 15 minutes
	if err != nil {
		fmt.Println(err.Error())
		return "", fmt.Errorf("error generating presigned URL: %w", err)
	}

	fmt.Println(urlStr)

	return urlStr, nil
}

func GetAllFileURLs(pool *pgxpool.Pool, groupID string) ([]FileDetails, error) {
	// Convert groupID to int for consistency in key construction
	groupIDInt, err := strconv.Atoi(groupID)
	if err != nil {
		fmt.Println(err.Error())
		return nil, fmt.Errorf("invalid groupID: %w", err)
	}

	// Query the database for all files in the specified group
	rows, err := pool.Query(context.Background(), "SELECT file_id, file_name, label_name FROM files WHERE group_id = $1", groupIDInt)
	if err != nil {
		fmt.Println(err.Error())
		return nil, fmt.Errorf("error querying database for files: %w", err)
	}
	defer rows.Close()

	var files []FileDetails
	sess, err := createAWSSession() // Ensure this function securely initializes AWS session
	if err != nil {
		fmt.Println(err.Error())
		return nil, fmt.Errorf("error creating AWS session: %w", err)
	}

	svc := s3.New(sess)
	expiration := time.Duration(24 * time.Hour) // URL expires after 24 hours

	// Iterate through all the files returned by the query
	for rows.Next() {
		var fileDetail FileDetails
		err := rows.Scan(&fileDetail.FileID, &fileDetail.FileName, &fileDetail.LabelName)
		if err != nil {
			fmt.Println(err.Error())
			return nil, fmt.Errorf("error scanning database rows: %w", err)
		}

		// Construct the AWS object key for each file
		objectKey := fmt.Sprintf("%v-%v", groupID, fileDetail.FileName)
		dotIndex := strings.LastIndex(objectKey, ".")
		fileSubstring := objectKey[:dotIndex]
		fileExtension := objectKey[dotIndex:]
		awsKey := fileSubstring + strconv.Itoa(fileDetail.FileID) + fileExtension

		// Generate a pre-signed URL for the file
		req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
			Bucket: aws.String(AWS_BUCKET_NAME),
			Key:    aws.String(awsKey),
		})

		urlStr, err := req.Presign(expiration)
		if err != nil {
			fmt.Println(err.Error())
			continue // or return nil, fmt.Errorf("error generating presigned URL: %w", err)
		}

		fileDetail.URL = urlStr
		files = append(files, fileDetail)
	}

	if rows.Err() != nil {
		return nil, fmt.Errorf("error iterating database rows: %w", rows.Err())
	}

	return files, nil
}
