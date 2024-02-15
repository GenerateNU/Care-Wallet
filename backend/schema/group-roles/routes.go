package grouproles

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

// groupRoles.go file
func GetGroupRolesGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	groupRoles := v1.Group("")
	{
		groupRoles.GET("/roles", c.GetGroupRoles)
		groupRoles.GET("/member/:uid", c.GetGroupIDByUID)
	}

	return groupRoles
}

// GetGroupIDByUID godoc
//
//	@summary		Retrieve a group id given a user id
//	@description	get the group id from the user id
//	@tags			group
//
//	@param			uid	path		string	true	"user id"
//
//	@success		200	{object}	string
//	@failure		400	{object}	string
//	@router			/group/member/{uid} [get]
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
//	@tags			group
//
//	@success		200	{array}	models.GroupRole
//	@router			/group/roles [get]
func (pg *PgModel) GetGroupRoles(c *gin.Context) {
	careGroups, err := GetAllGroupRolesFromDB(pg.Conn)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, careGroups)
}
