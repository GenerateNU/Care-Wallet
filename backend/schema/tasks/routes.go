package tasks

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func TaskGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	tasks := v1.Group("tasks")
	{
		tasks.GET("/group/:gid", c.GetTasksByGroupId)
		tasks.GET("/created_by/:uid", c.GetTasksByCreatedBy)
		tasks.GET("/status/:status", c.GetTasksByStatus)
		tasks.GET("/type/:type", c.GetTasksByType)
		tasks.GET("/start/:startDate", c.GetTasksByStartDate)
		tasks.GET("/end/:endDate", c.GetTasksByEndDate)
	}

	return tasks
}

// GetTasksByGroupId godoc
//
//	@summary		Get All Tasks By Group ID
//	@description	get all tasks by group id
//	@tags			tasks
//	@success		200	{array}	models.Task
//	@router			/tasks/{gid} [get]
func (pg *PgModel) GetTasksByGroupId(c *gin.Context) {
	tasks, err := GetTasksByGroupIdFromDB(pg.Conn, c.Param("gid"))

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, tasks)
}

// GetTasksByCreatedBy godoc
//
//	@summary		Get All Tasks By Created By
//	@description	get all tasks by created by
//	@tags			tasks
//	@success		200	{array}	models.Task
//	@router			/tasks/{uid} [get]
func (pg *PgModel) GetTasksByCreatedBy(c *gin.Context) {
	tasks, err := GetTasksByCreatedByFromDB(pg.Conn, c.Param("uid"))

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, tasks)
}

// GetTasksByStatus godoc
//
//	@summary		Get All Tasks By Status
//	@description	get all tasks by status
//	@tags			tasks
//	@success		200	{array}	models.Task
//	@router			/tasks/{status} [get]
func (pg *PgModel) GetTasksByStatus(c *gin.Context) {
	tasks, err := GetTasksByStatusFromDB(pg.Conn, c.Param("status"))

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, tasks)
}

// GetTasksByType godoc
//
//	@summary		Get All Tasks By Type
//	@description	get all tasks by type
//	@tags			tasks
//	@success		200	{array}	models.Task
//	@router			/tasks/{type} [get]
func (pg *PgModel) GetTasksByType(c *gin.Context) {
	tasks, err := GetTasksByTypeFromDB(pg.Conn, c.Param("type"))

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, tasks)
}

// GetTasksByStartDate godoc
//
//	@summary		Get All Tasks By Start Date
//	@description	get all tasks by start date
//	@tags			tasks
//	@success		200	{array}	models.Task
//	@router			/tasks/{startDate} [get]
func (pg *PgModel) GetTasksByStartDate(c *gin.Context) {
	tasks, err := GetTasksByStartDateFromDB(pg.Conn, c.Param("startDate"))

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, tasks)
}

// GetTasksByEndDate godoc
//
//	@summary		Get All Tasks By End Date
//	@description	get all tasks by end date
//	@tags			tasks
//	@success		200	{array}	models.Task
//	@router			/tasks/{endDate} [get]
func (pg *PgModel) GetTasksByEndDate(c *gin.Context) {
	tasks, err := GetTasksByEndDateFromDB(pg.Conn, c.Param("endDate"))

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, tasks)
}