package task_labels

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
)

type PgModel struct {
	Conn *pgx.Conn
}

func TaskGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	tasks := v1.Group(":tid/labels")
	{
		tasks.POST("", c.AddLabelToTask)
		tasks.DELETE("", c.RemoveLabelFromTask)
		tasks.GET("", c.GetLabelsByTask)
	}

	return tasks
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
func (pg *PgModel) GetLabelsByTask(c *gin.Context) {
	taskLabels, err := GetLabelsByTaskInDB(pg.Conn, c.Param("tid"))

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
func (pg *PgModel) AddLabelToTask(c *gin.Context) {
	var requestBody LabelData

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	updatedTaskLabel, err := AddLabelToTaskInDB(pg.Conn, requestBody, c.Param("tid"))

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
func (pg *PgModel) RemoveLabelFromTask(c *gin.Context) {
	var requestBody LabelData

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err := RemoveLabelFromTaskInDB(pg.Conn, requestBody, c.Param("tid"))

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, "")
}
