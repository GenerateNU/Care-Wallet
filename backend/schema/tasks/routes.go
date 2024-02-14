package tasks

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func TaskGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	tasks := v1.Group("tasks")
	{
		tasks.GET("/filtered", c.GetFilteredTasks)
		tasks.POST("/:tid/assign", c.AssignUsersToTask)
		tasks.DELETE("/:tid/remove", c.RemoveUsersFromTask)
		tasks.GET("/assigned", c.GetTasksByAssignedUsers)
	}

	return tasks
}

type TaskQuery struct {
	GroupID    string `form:"groupID"`
	CreatedBy  string `form:"createdBy"`
	TaskStatus string `form:"taskStatus"`
	TaskType   string `form:"taskType"`
	StartDate  string `form:"startDate"`
	EndDate    string `form:"endDate"`
}

// GetFilteredTasks godoc
//
//	@summary		Get Filtered Tasks
//	@description	get filtered tasks
//	@tags			tasks
//
//	@param			_	query		TaskQuery	true	"Filters for task query"
//
//	@success		200	{array}		models.Task
//	@failure		400	{object}	string
//	@router			/tasks/filtered [get]
func (pg *PgModel) GetFilteredTasks(c *gin.Context) {
	var filterQuery TaskQuery
	if err := c.ShouldBindQuery(&filterQuery); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	tasks, err := GetTasksByQueryFromDB(pg.Conn, filterQuery)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, tasks)
}

type Assignment struct {
	UserIDs  []string `json:"userIDs"`
	Assigner string   `json:"assigner"`
}

// AssignUsersToTask godoc
//
//	@summary		Assign Users To Task
//	@description	assign users to task
//	@tags			tasks
//
//	@param			tid	path		string		true	"Task ID to assign users to"
//	@param			_	body		Assignment	true	"Users to assign to task and assignee"
//
//	@success		200	{array}		models.TaskUser
//	@failure		400	{object}	string
//	@router			/tasks/{tid}/assign [post]
func (pg *PgModel) AssignUsersToTask(c *gin.Context) {
	var requestBody Assignment

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	assignedUsers, err := AssignUsersToTaskInDB(pg.Conn, requestBody.UserIDs, c.Param("tid"), requestBody.Assigner)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, assignedUsers)
}

type Removal struct {
	UserIDs []string `json:"userIDs"`
}

// RemoveUsersFromTask godoc
//
//	@summary		Remove Users From Task
//	@description	remove users from task
//	@tags			tasks
//
//	@param			tid	path		string	true	"Task ID to remove users from"
//	@param			_	body		Removal	true	"Users to remove from task"
//
//	@success		200	{array}		models.TaskUser
//	@failure		400	{object}	string
//	@router			/tasks/{tid}/remove [delete]
func (pg *PgModel) RemoveUsersFromTask(c *gin.Context) {
	var requestBody Removal

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	removedUsers, err := RemoveUsersFromTaskInDB(pg.Conn, requestBody.UserIDs, c.Param("tid"))

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, removedUsers)
}

type AssignedQuery struct {
	UserIDs []string `query:"userIDs"`
}

// GetTasksByAssignedUsers godoc
//
//	@summary		Get Tasks Assigned To Given Users
//	@description	get tasks assigned to given users
//	@tags			tasks
//
//	@param			_	query		AssignedQuery	true	"Users to return tasks for"
//
//	@success		200	{array}		models.Task
//	@failure		400	{object}	string
//	@router			/tasks/assigned [get]
func (pg *PgModel) GetTasksByAssignedUsers(c *gin.Context) {
	userIDs := c.Query("userIDs")
	assignedQuery := AssignedQuery{
		UserIDs: strings.Split(userIDs, ","),
	}

	tasks, err := GetTasksByAssignedFromDB(pg.Conn, assignedQuery.UserIDs)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, tasks)
}
