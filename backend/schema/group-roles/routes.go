package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func GetGroupRolesGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	groupRoles := v1.Group("group-roles")
	{
		groupRoles.GET("/get-group/:uid", c.GetGroupIDByUID)
		groupRoles.GET("", c.GetGroupRoles)
	}

	return groupRoles
}

// GetGroupIDByUID godoc
//
// @summary get groupid
// @description get the group id from the user id
// @tags group
//
// @param uid path string true "user id"
//
// @success 200 {object} string
// @failure 400 {object} string
// @router /group-roles/get-group/{uid} [get]
func (pg *PgModel) GetGroupIDByUID(c *gin.Context) {
	uid := c.Param("uid")
	groupID, err := GetGroupIDByUIDFromDB(pg.Conn, uid)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, groupID)
}

// GetGroupRoles godoc
//
//	@summary		Get all group roles
//	@description	get all group roles from the db
//	@tags			group-roles
//	@success		200	{array}	models.GroupRole
//	@router			/group-roles [get]
func (pg *PgModel) GetGroupRoles(c *gin.Context) {
	careGroups, err := GetAllGroupRolesFromDB(pg.Conn)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, careGroups)
}
