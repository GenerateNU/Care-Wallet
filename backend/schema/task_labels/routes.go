package task_labels

import (
	"carewallet/models"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgModel struct {
	Conn *pgxpool.Pool
}

func TaskGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	tasks := v1.Group("")
	{
		labelByTaskID := tasks.Group(":tid/labels")
		{
			labelByTaskID.POST("", c.addLabelToTask)
			labelByTaskID.DELETE("", c.removeLabelFromTask)
			labelByTaskID.GET("", c.getLabelsByTask)
		}

		labelByTaskIDs := tasks.Group("labels/tasks")
		{
			labelByTaskIDs.GET("", c.getLabelsByTasks)
		}
	}

	return tasks
}

type LabelsQuery struct {
	TaskIDs []string `form:"taskIDs"`
}

// getLabelsByTasks godoc
//
//	@summary		gets the information about multiple labels
//	@description	gets the information about multiple labals given their task id
//	@tags			task labels
//
//	@param			taskIDs	query		[]string	true	"Task IDs"
//
//	@success		200		{array}		models.Task_Label
//	@failure		400		{object}	string
//	@router			/tasks/labels/tasks [GET]
func (pg *PgModel) getLabelsByTasks(c *gin.Context) {

	taskIDs := c.Query("taskIDs")
	taskQuery := LabelsQuery{
		TaskIDs: strings.Split(taskIDs, ","),
	}

	var labels []models.Task_Label

	for _, element := range taskQuery.TaskIDs {
		label, err := getLabelsByTaskInDB(pg.Conn, element)
		if err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		labels = append(labels, label...)
	}

	c.JSON(http.StatusOK, labels)
}

// GetLabelsByTask godoc
//
//	@summary		get a tasks labels
//	@description	get a tasks labels given the task id
//	@tags			task labels
//
//	@param			tid	path		string	true	"the task id to get labels for"
//
//	@success		200	{array}		models.Task_Label
//	@failure		400	{object}	string
//	@router			/tasks/{tid}/labels [GET]
func (pg *PgModel) getLabelsByTask(c *gin.Context) {
	taskLabels, err := getLabelsByTaskInDB(pg.Conn, c.Param("tid"))

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, taskLabels)
}

type LabelData struct {
	GroupID   int    `json:"group_id"`
	LabelName string `json:"label_name"`
}

// AddLabelToTask godoc
//
//	@summary		add a label to a task
//	@description	add a label to a task given the task id, group id, and label name
//	@tags			task labels
//
//	@param			tid			path		int			true	"the task id to add the label to"
//	@param			requestBody	body		LabelData	true	"The label data to add to the task"
//
//	@success		200			{object}	models.Task_Label
//	@failure		400			{object}	string
//	@router			/tasks/{tid}/labels [POST]
func (pg *PgModel) addLabelToTask(c *gin.Context) {
	var requestBody LabelData

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	updatedTaskLabel, err := addLabelToTaskInDB(pg.Conn, requestBody, c.Param("tid"))

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, updatedTaskLabel)
}

// RemoveLabelFromTask godoc
//
//	@summary		remove a label from a task
//	@description	remove a label from a task given the task id, group id, and label name
//	@tags			task labels
//
//	@param			tid			path		int			true	"the task id to get labels for"
//	@param			requestBody	body		LabelData	true	"The label data to remove from the task"
//
//	@success		200			{object}	string
//	@failure		400			{object}	string
//	@router			/tasks/{tid}/labels [DELETE]
func (pg *PgModel) removeLabelFromTask(c *gin.Context) {
	var requestBody LabelData

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err := removeLabelFromTaskInDB(pg.Conn, requestBody, c.Param("tid"))

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, "")
}
