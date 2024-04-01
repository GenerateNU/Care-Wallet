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
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/aws/aws-sdk-go/service/s3/s3manager"
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
