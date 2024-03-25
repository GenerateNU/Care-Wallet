package labels

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgModel struct {
	Conn *pgxpool.Pool
}

func LabelGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	labels := v1.Group(":groupId/labels")
	{
		labels.POST("", c.CreateNewLabel)
		labels.GET("", c.GetLabelsByGroup)
		labels.DELETE(":lname", c.DeleteLabel)
		labels.PATCH(":lname", c.EditLabel)
	}

	return labels
}

// GetLabelsByGroup godoc
//
//	@summary		get labels for a group
//	@description	get all labels for a group given their group id
//	@tags			labels
//
//	@param			groupId	path		int	true	"the group id to get labels for"
//
//	@success		200		{array}		models.Label
//	@failure		400		{object}	string
//	@router			/group/{groupId}/labels [GET]
func (pg *PgModel) GetLabelsByGroup(c *gin.Context) {
	group_id := c.Param("groupId")

	labels, err := GetLabelsByGroupFromDB(pg.Conn, group_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, labels)
}

type LabelData struct {
	LabelName  string `json:"label_name"`
	LabelColor string `json:"label_color"`
}

// CreateNewLabel godoc
//
//	@summary		Create A New Label
//	@description	create a new label for a group
//	@tags			labels
//
//	@param			groupId	path		string		true	"Group to create label for"
//	@param			_		body		LabelData	true	"Label creation data"
//
//	@success		200		{object}	models.Label
//	@failure		400		{object}	string
//	@router			/group/{groupId}/labels [POST]
func (pg *PgModel) CreateNewLabel(c *gin.Context) {
	var requestBody LabelData
	group_id := c.Param("groupId")

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("Error binding JSON: ", err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	id, _ := strconv.Atoi(group_id)

	label, err := CreateNewLabelInDB(pg.Conn, id, requestBody)
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
//	@param			groupId	path		string	true	"Group to delete label from"
//	@param			lname	path		string	true	"Name of label to delete"
//
//	@success		200		{object}	string
//	@failure		400		{object}	string
//	@router			/group/{groupId}/labels/{lname} [DELETE]
func (pg *PgModel) DeleteLabel(c *gin.Context) {
	group_id := c.Param("groupId")
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
//	@param			groupId	path		string		true	"Group of label to edit"
//	@param			lname	path		string		true	"Name of label to edit"
//	@param			_		body		LabelData	true	"Label edit data"
//
//	@success		200		{object}	models.Label
//	@failure		400		{object}	string
//	@router			/group/{groupId}/labels/{lname} [PATCH]
func (pg *PgModel) EditLabel(c *gin.Context) {
	group_id := c.Param("groupId")
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
