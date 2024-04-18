package tasks

import (
	"carewallet/models"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgModel struct {
	Conn *pgxpool.Pool
}

func TaskGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	tasks := v1.Group("")
	{
		tasks.GET("/filtered", c.getFilteredTasks)
		tasks.GET("/assigned", c.getTasksByAssignedUsers)
		tasks.POST("", c.createTask)

		byId := tasks.Group("/:tid")
		{
			byId.GET("", c.getTaskByID)
			byId.DELETE("", c.deleteTask)
			byId.PUT("/status/:status", c.updateTaskStatus)
			byId.PUT("", c.updateTaskInfo)
			byId.GET("/assigned", c.getUsersAssignedToTask)
			byId.POST("/assign", c.assignUsersToTask)
			byId.DELETE("/remove", c.removeUsersFromTask)
		}
	}
	return tasks
}

// GetTaskByID godoc
//
//	@summary		get task by id
//	@description	get a task given its id
//	@tags			tasks
//
//	@param			tid	path		int	true	"the id of the task"
//
//	@success		200	{object}	models.Task
//	@failure		400	{object}	string
//	@router			/tasks/{tid} [GET]
func (pg *PgModel) getTaskByID(c *gin.Context) {
	taskID, err := strconv.Atoi(c.Param("tid"))
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	task, err := getTaskByID(pg.Conn, taskID)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, task)
}

type TaskQuery struct {
	TaskID     string `form:"taskID"`
	TaskTitle  string `form:"taskTitle"`
	GroupID    string `form:"groupID"`
	CreatedBy  string `form:"createdBy"`
	TaskStatus string `form:"taskStatus"`
	TaskType   string `form:"taskType"`
	StartDate  string `form:"startDate"`
	EndDate    string `form:"endDate"`
	QuickTask  string `form:"quickTask"`
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
func (pg *PgModel) getFilteredTasks(c *gin.Context) {
	var filterQuery TaskQuery
	if err := c.ShouldBindQuery(&filterQuery); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	tasks, err := getTasksByQueryFromDB(pg.Conn, filterQuery)

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
func (pg *PgModel) assignUsersToTask(c *gin.Context) {
	var requestBody Assignment
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	assignedUsers, err := assignUsersToTaskInDB(pg.Conn, requestBody.UserIDs, c.Param("tid"), requestBody.Assigner)
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
func (pg *PgModel) removeUsersFromTask(c *gin.Context) {
	var requestBody Removal
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	removedUsers, err := removeUsersFromTaskInDB(pg.Conn, requestBody.UserIDs, c.Param("tid"))
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
func (pg *PgModel) getTasksByAssignedUsers(c *gin.Context) {
	userIDs := c.Query("userIDs")
	assignedQuery := AssignedQuery{
		UserIDs: strings.Split(userIDs, ","),
	}
	tasks, err := getTasksByAssignedFromDB(pg.Conn, assignedQuery.UserIDs)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, tasks)
}

type TaskBody struct {
	GroupID           int        `json:"group_id"`
	CreatedBy         string     `json:"created_by"` // User ID
	CreatedDate       time.Time  `json:"created_date"`
	StartDate         *time.Time `json:"start_date"`
	EndDate           *time.Time `json:"end_date"`
	QuickTask         bool       `json:"quick_task"`
	Notes             *string    `json:"notes"`
	Repeating         bool       `json:"repeating"`
	RepeatingInterval *string    `json:"repeating_interval"`
	RepeatingEndDate  *time.Time `json:"repeating_end_date"`
	TaskStatus        string     `json:"task_status"`
	TaskType          string     `json:"task_type"`
	TaskInfo          *string    `json:"task_info"`
}

// CreateTask godoc
//
//	@summary		Create a New Task
//	@description	Create a new task
//	@tags			tasks
//
//	@param			request_body	body		TaskBody	true	"Create Task Request"
//
//	@success		201				{object}	models.Task	"Created Task"
//	@router			/tasks [post]
func (pg *PgModel) createTask(c *gin.Context) {
	// Bind the request body to the CreateTaskRequest struct
	var requestBody models.Task
	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("error binding to request body: ", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Create the new task in the database
	newTaskID, err := createTaskInDB(pg.Conn, requestBody)
	if err != nil {
		fmt.Println("error creating task in the database:", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Fetch the created task from the database
	createdTask, err := getTaskByID(pg.Conn, newTaskID)
	if err != nil {
		fmt.Println("error fetching created task from the database:", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusCreated, createdTask)
}

// DeleteTask godoc
//
//	@summary		Delete a Task
//	@description	Delete a task by ID
//	@tags			tasks
//	@param			tid	path	int	true	"Task ID"
//	@success		204	"No Content"
//	@router			/tasks/{tid} [delete]
func (pg *PgModel) deleteTask(c *gin.Context) {
	// Extract task ID from the path parameter
	taskID, err := strconv.Atoi(c.Param("tid"))
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Check if the task exists before attempting to delete
	if _, err := getTaskByID(pg.Conn, taskID); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Delete the task from the database
	if err := deleteTaskInDB(pg.Conn, taskID); err != nil {
		fmt.Println("error deleting task from the database:", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusNoContent)
}

// UpdateTaskInfo godoc
//
//	@summary		Update Task Info
//	@description	Update the task_info field of a task by ID
//	@tags			tasks
//	@param			tid				path		int			true	"Task ID"
//	@param			request_body	body		TaskBody	true	"Update Task Info Request"
//	@success		200				{object}	models.Task	"Updated Task"
//	@router			/tasks/{tid} [put]
func (pg *PgModel) updateTaskInfo(c *gin.Context) {
	// Extract task ID from the path parameter
	taskID, err := strconv.Atoi(c.Param("tid"))
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Bind the request body to the UpdateTaskInfoRequest struct
	var requestBody models.Task

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("error binding to request body: ", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Update the task_info field in the database
	if err := updateTaskInfoInDB(pg.Conn, taskID, requestBody); err != nil {
		fmt.Println("error updating task info in the database:", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Fetch the updated task from the database
	updatedTask, err := getTaskByID(pg.Conn, taskID)
	if err != nil {
		fmt.Println("error fetching updated task from the database:", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, updatedTask)
}

// TaskUser represents the user assigned to a task.
type TaskUser struct {
	UserID string `json:"userID"`
}

// GetUsersAssignedToTask godoc
//
//	@summary		Get list of users assigned to a task
//	@description	Get list of users assigned to a task by task ID
//	@tags			tasks
//	@param			tid	path		int		true	"Task ID"
//	@success		200	{array}		string	"List of user IDs assigned to the task"
//	@failure		400	{object}	string
//	@router			/tasks/{tid}/assigned [get]
func (pg *PgModel) getUsersAssignedToTask(c *gin.Context) {
	// Extract task ID from the path parameter
	taskIDStr := c.Param("tid")
	taskID, err := strconv.Atoi(taskIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Get list of users assigned to the task
	userIDs, err := getUsersAssignedToTaskFromDB(pg.Conn, taskID)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, userIDs)
}

// GetUsersAssignedToTask godoc
//
//	@summary		Get list of users assigned to a task
//	@description	Get list of users assigned to a task by task ID
//	@tags			tasks
//	@param			tid		path		int	true	"Task ID"
//	@param			status	path		int	true	"Task Status"
//	@success		200		{object}	string
//	@failure		400		{object}	string
//	@router			/tasks/{tid}/status/{status} [get]
func (pg *PgModel) updateTaskStatus(c *gin.Context) {
	taskIDStr := c.Param("tid")
	newStatus := c.Param("status")
	fmt.Print(newStatus)
	taskID, err := strconv.Atoi(taskIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = updateTaskStatusInDB(pg.Conn, taskID, newStatus)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, "")
}
