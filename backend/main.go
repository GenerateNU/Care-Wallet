package main

import (
	"carewallet/configuration"
	"carewallet/db"
	_ "carewallet/docs"
	"carewallet/schema/files"
	groupRoles "carewallet/schema/group-roles"
	"carewallet/schema/groups"
	"carewallet/schema/labels"
	"carewallet/schema/medication"
	"carewallet/schema/task_labels"
	"carewallet/schema/tasks"
	"carewallet/schema/user"
	"context"
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

	defer conn.Close(context.Background())

	// prepare gin
	// uncomment below mode if want to get back to release debug mode
	//gin.SetMode(gin.ReleaseMode)

	// gin with default setup
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	v1 := r.Group("/")
	{
		medication.GetMedicationGroup(v1, &medication.PgModel{Conn: conn})

		files.FileGroup(v1, &files.PgModel{Conn: conn})

		user.UserGroup(v1, &user.PgModel{Conn: conn})

		group := v1.Group("group")
		{
			groups.CareGroups(group, &groups.PgModel{Conn: conn})
			groupRoles.GroupRolesGroup(group, &groupRoles.PgModel{Conn: conn})
			labels.LabelGroup(group, &labels.PgModel{Conn: conn})
		}

		task := v1.Group("tasks")
		{
			tasks.TaskGroup(task, &tasks.PgModel{Conn: conn})
			task_labels.TaskGroup(task, &task_labels.PgModel{Conn: conn})
		}
	}

	if enviroment == configuration.EnvironmentLocal {
		r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}

	r.Run()
}
