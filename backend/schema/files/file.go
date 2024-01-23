package schema

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
)

var AWS_BUCKET_NAME = "care-wallet-storage"
var AWS_ACCESS_KEY = "AKIAQKBC2NPBH4VQQ3KZ"
var AWS_SECRET_KEY = "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"

// TODO:--> understand cache (stole this from legacy)
func createAWSSession() (*session.Session, error) {
	// TODO:--> consider caching active session so we dont make f new one every time
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.NewStaticCredentials(AWS_ACCESS_KEY, AWS_SECRET_KEY, ""),
	})

	if err != nil {
		return nil, err
	}

	return sess, nil
}
