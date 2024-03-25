package db

import (
	"carewallet/configuration"
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func ConnectPosgresDatabase(settings configuration.Settings) *pgxpool.Pool {
	db_url, exists := os.LookupEnv("DATABASE_URL")

	// TODO: move these to the configuration file
	const defaultMaxConns = int32(10)
	const defaultMinConns = int32(0)
	const defaultMaxConnLifetime = time.Hour
	const defaultMaxConnIdleTime = time.Minute * 30
	const defaultHealthCheckPeriod = time.Minute
	const defaultConnectTimeout = time.Second * 5

	var err error
	var conn *pgxpool.Pool
	if !exists {
		db_url = fmt.Sprintf("postgres://%s:%s@%s:%d/%s", settings.Database.Username, settings.Database.Password, settings.Database.Host, settings.Database.Port, settings.Database.DatabaseName)
	}

	dbConfig, err := pgxpool.ParseConfig(db_url)
	if err != nil {
		log.Fatal("Failed to create a config, error: ", err)
	}

	dbConfig.MaxConns = defaultMaxConns
	dbConfig.MinConns = defaultMinConns
	dbConfig.MaxConnLifetime = defaultMaxConnLifetime
	dbConfig.MaxConnIdleTime = defaultMaxConnIdleTime
	dbConfig.HealthCheckPeriod = defaultHealthCheckPeriod
	dbConfig.ConnConfig.ConnectTimeout = defaultConnectTimeout

	dbConfig.BeforeClose = func(c *pgx.Conn) {
		log.Println("Closed the connection pool to the database!!")
	}

	conn, err = pgxpool.NewWithConfig(context.Background(), dbConfig)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	return conn
}
