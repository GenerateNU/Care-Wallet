package db

import (
	"carewallet/configuration"
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4"
)

func ConnectPosgresDatabase(settings configuration.Settings) *pgx.Conn {
	db_url, exists := os.LookupEnv("DATABASE_URL")

	var err error
	var conn *pgx.Conn
	if exists {
		conn, err = pgx.Connect(context.Background(), db_url)
		if err != nil {
			panic(err)
		}
		return conn
	}

	conn, err = pgx.Connect(context.Background(), fmt.Sprintf("postgres://%s:%s@%s:%d/%s", settings.Database.Username, settings.Database.Password, settings.Database.Host, settings.Database.Port, settings.Database.DatabaseName))

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	return conn
}
