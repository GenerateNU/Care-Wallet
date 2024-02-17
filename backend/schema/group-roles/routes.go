package grouproles

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

// groupRoles.go file
func GroupRolesGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	groupRoles := v1.Group("")
	{
		groupRoles.GET("/:groupId/roles", c.GetGroupRoles)
		groupRoles.GET("/member/:uid", c.GetGroupByUID)
	}

	return groupRoles
}

// GetGroupByUID godoc
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
func (pg *PgModel) GetGroupByUID(c *gin.Context) {
	uid := c.Param("uid")
	groupRole, err := GetGroupMemberByUIDFromDB(pg.Conn, uid)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, groupRole)
}

// GetGroupRoles godoc
//
//	@summary		Get all members of a group
//	@description	get all group members for a group given group id from the db
//	@tags			group
//
//	@param			groupId	path	int	true	"group id"
//
//	@success		200		{array}	models.GroupRole
//	@router			/group/{groupId}/roles [get]
func (pg *PgModel) GetGroupRoles(c *gin.Context) {
	gid := c.Param("groupId")
	if gidInt, err := strconv.Atoi(gid); err == nil {
		if careGroups, err := GetAllGroupRolesFromDB(pg.Conn, gidInt); err == nil {
			c.JSON(http.StatusOK, careGroups)
			return
		}

		c.JSON(http.StatusBadRequest, err.Error())
	}
}
