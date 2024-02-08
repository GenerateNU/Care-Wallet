package labels

import (
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
	}

	return labels
}

type LabelCreation struct {
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
//	@param			_	body		LabelCreation	true	"Label creation data"
//
//	@success		200	{object}	models.Label
//	@failure		400	{object}	string
//	@router			/labels/new [post]
func (pg *PgModel) CreateNewLabel(c *gin.Context) {
	var requestBody LabelCreation

	if err := c.BindJSON(&requestBody); err != nil {
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
