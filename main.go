package main

import (
	"carewallet/backend/db"
	"carewallet/backend/schema/medication"
	"carewallet/configuration"
	"fmt"
	"os"

	_ "carewallet/docs"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Care Wallet API
// @version 1.0
// @description This is an API for the CareWallet App.
// @BasePath /
func main() {
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
		//...
	}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	err = r.Run(":8080")

	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}
