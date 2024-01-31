package files

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
)

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
