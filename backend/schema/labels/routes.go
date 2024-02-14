package labels

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func LabelGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	labels := v1.Group("labels")
	{
		labels.POST("/new", c.CreateNewLabel)
		labels.DELETE("/delete/:gid/:lname", c.DeleteLabel)
		labels.PATCH("/edit/:gid/:lname", c.EditLabel)
	}

	return labels
}

type LabelData struct {
	GroupID    int    `json:"group_id"`
	LabelName  string `json:"label_name"`
	LabelColor string `json:"label_color"`
}

// CreateNewLabel godoc
//
//	@summary		Create A New Label
//	@description	create a new label for a group
//	@tags			labels
//
//	@param			_	body		LabelData	true	"Label creation data"
//
//	@success		200	{object}	models.Label
//	@failure		400	{object}	string
//	@router			/labels/new [post]
func (pg *PgModel) CreateNewLabel(c *gin.Context) {
	var requestBody LabelData

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("Error binding JSON: ", err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	label, err := CreateNewLabelInDB(pg.Conn, requestBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, label)
}

// DeleteLabel godoc
//
//	@summary		Delete A Label
//	@description	delete a label
//	@tags			labels
//
//	@param			gid		path		string	true	"Group to delete label from"
//	@param			lname	path		string	true	"Name of label to delete"
//
//	@success		200		{object}	models.Label
//	@failure		400		{object}	string
//	@router			/labels/delete/{gid}/{lname} [DELETE]
func (pg *PgModel) DeleteLabel(c *gin.Context) {
	group_id := c.Param("gid")
	label_name := c.Param("lname")

	err := DeleteLabelFromDB(pg.Conn, group_id, label_name)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, nil)
}

// EditLabel godoc
//
//	@summary		Edit A Label
//	@description	edit a label
//	@tags			labels
//
//	@param			gid		path		string		true	"Group of label to edit"
//	@param			lname	path		string		true	"Name of label to edit"
//	@param			_		body		LabelData	true	"Label edit data"
//
//	@success		200		{object}	models.Label
//	@failure		400		{object}	string
//	@router			/labels/edit/{gid}/{lname} [PATCH]
func (pg *PgModel) EditLabel(c *gin.Context) {
	group_id := c.Param("gid")
	label_name := c.Param("lname")

	var requestBody LabelData

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	label, err := EditLabelInDB(pg.Conn, group_id, label_name, requestBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, label)
}
