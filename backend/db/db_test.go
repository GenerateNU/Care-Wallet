package db

import (
	"carewallet/configuration"
	"context"
	"fmt"
	"os"
	"testing"

	_ "github.com/lib/pq"
)

func TestDBConnection(t *testing.T) {
	config, err := configuration.GetConfiguration()

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to retreive configuration file: %v\n", err)
		os.Exit(1)
	}

	t.Run("TestConnectPosgresDatabase", func(t *testing.T) {
		conn := ConnectPosgresDatabase(config)
		defer conn.Close()

		err = conn.Ping(context.Background())

		if err != nil {
			t.Error("Failed to connect to the Database")
		}
	})
}
