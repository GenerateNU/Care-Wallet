package main

import (
	"carewallet/configuration"
	"carewallet/db"
	_ "carewallet/docs"
	"carewallet/schema/files"
	"carewallet/schema/medication"
	"carewallet/schema/tasks"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// Care-Wallet API godoc
//
//	@title			Care-Wallet API
//	@version		1.0
//	@description	This is an API for the Care-Wallet App.
//	@BasePath		/
func main() {
	enviroment := configuration.GetEnviroment()
	config, err := configuration.GetConfiguration()

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to retreive configuration file: %v\n", err)
		os.Exit(1)
	}

	conn := db.ConnectPosgresDatabase(config)

	defer conn.Close()

	r := gin.Default()

	v1 := r.Group("/")
	{
		medication.GetMedicationGroup(v1, &medication.PgModel{Conn: conn})
		files.GetFileGroup(v1, &files.PgModel{Conn: conn})
		tasks.TaskGroup(v1, &tasks.PgModel{Conn: conn})
	}

	if enviroment == configuration.EnvironmentLocal {
		r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}

	err = r.Run(":8080")

	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}
