package tasks

import (
	"fmt"
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
		tasks.GET("/filtered", c.GetFilteredTasks)
		tasks.POST("/:tid/assign", c.AssignUsersToTask)
		tasks.DELETE("/:tid/remove", c.RemoveUsersFromTask)
	}

	return tasks
}

type TaskQuery struct {
	GroupID    string `query:"groupID"`
	CreatedBy  string `query:"createdBy"`
	TaskStatus string `query:"taskStatus"`
	TaskType   string `query:"taskType"`
	StartDate  string `query:"startDate"`
	EndDate    string `query:"endDate"`
}

// GetFilteredTasks godoc
//
//	@summary		Get Filtered Tasks
//	@description	get filtered tasks
//	@tags			tasks
//	@success		200	{array}	models.Task
//	@router			/tasks/filtered [get]
func (pg *PgModel) GetFilteredTasks(c *gin.Context) {
	filterQuery := TaskQuery{
		GroupID:    c.Query("GroupID"),
		CreatedBy:  c.Query("CreatedBy"),
		TaskStatus: c.Query("TaskStatus"),
		TaskType:   c.Query("TaskType"),
		StartDate:  c.Query("StartDate"),
		EndDate:    c.Query("EndDate"),
	}

	tasks, err := GetTasksByQueryFromDB(pg.Conn, filterQuery)

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, tasks)
}

// AssignUsersToTask godoc
//
//	@summary		Assign Users To Task
//	@description	assign users to task
//	@tags			tasks
//	@success		200	{array}	models.TaskUser
//	@router			/tasks/{tid}/assignees [post]
func (pg *PgModel) AssignUsersToTask(c *gin.Context) {
	var requestBody struct {
		UserIDs  []string `json:"userIDs"`
		Assigner string   `json:"assigner"`
	}

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("error binding to request body: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	assignedUsers, err := AssignUsersToTaskInDB(pg.Conn, requestBody.UserIDs, c.Param("tid"), requestBody.Assigner)

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, assignedUsers)
}

// RemoveUsersFromTask godoc
//
//	@summary		Remove Users From Task
//	@description	remove users from task
//	@tags			tasks
//	@success		200	{array}	models.TaskUser
//	@router			/tasks/{tid}/remove [delete]
func (pg *PgModel) RemoveUsersFromTask(c *gin.Context) {
	var requestBody struct {
		UserIDs []string `json:"userIDs"`
	}

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("error binding to request body: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	removedUsers, err := RemoveUsersFromTaskInDB(pg.Conn, requestBody.UserIDs, c.Param("tid"))

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, removedUsers)
}
