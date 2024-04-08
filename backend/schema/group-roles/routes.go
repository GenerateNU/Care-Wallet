package grouproles

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgModel struct {
	Conn *pgxpool.Pool
}

func GroupRolesGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	groupRoles := v1.Group("")
	{
		groupRoles.GET("/:groupId/roles", c.getGroupRoles)

		group := v1.Group(":groupId")
		{
			user := group.Group(":uid")
			{
				user.DELETE("", c.removeUserFromGroup)
				user.PATCH(":role", c.changeUserGroupRole)
				user.PUT(":role", c.addUserToGroup)
			}
		}
		groupRoles.GET("/member/:uid", c.getGroupByUID)
	}

	return groupRoles
}

// ChangeUserGroupRole godoc
//
//	@summary		Change a user group role
//	@description	Change a user group role based off of group id and user id and role
//	@tags			group
//
//	@param			groupId	path		string	true	"groupId"
//	@param			uid		path		string	true	"userId"
//	@param			role	path		string	true	"New User Group Role"
//
//	@success		200		{object}	string
//	@failure		400		{object}	string
//	@router			/group/{groupId}/{uid}/{role} [patch]
func (pg *PgModel) changeUserGroupRole(c *gin.Context) {
	gid := c.Param("groupId")
	gidInt, err := strconv.Atoi(gid)
	uid := c.Param("uid")
	role := c.Param("role")

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = changeUserGroupRoleInDB(pg.Conn, gidInt, uid, role)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, "")
}

// AddUserToGroup godoc
//
//	@summary		Add a user to a group
//	@description	add a user to a group given a user id and group id and role
//	@tags			group
//
//	@param			groupId	path		string	true	"groupId"
//	@param			uid		path		string	true	"userId"
//	@param			role	path		string	true	"Group	Role"
//
//	@success		200		{object}	models.GroupRole
//	@failure		400		{object}	string
//	@router			/group/{groupId}/{uid}/{role} [put]
func (pg *PgModel) addUserToGroup(c *gin.Context) {
	gid := c.Param("groupId")
	gidInt, err := strconv.Atoi(gid)
	uid := c.Param("uid")
	role := c.Param("role")

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	groupRole, err := addUserToGroupInDB(pg.Conn, gidInt, uid, role)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, groupRole)
}

// RemoveUserFromGroup godoc
//
//	@summary		Remove a user from a group
//	@description	removes a user from a group given a group id and user id
//	@tags			group
//
//	@param			groupId	path		string	true	"groupId"
//	@param			uid		path		string	true	"userId"
//
//	@success		200		{object}	models.GroupRole
//	@failure		400		{object}	string
//	@router			/group/{groupId}/{uid} [delete]
func (pg *PgModel) removeUserFromGroup(c *gin.Context) {
	gid := c.Param("groupId")
	gidInt, err := strconv.Atoi(gid)
	uid := c.Param("uid")

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = removeUserFromGroupInDB(pg.Conn, gidInt, uid)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, "")
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
func (pg *PgModel) getGroupByUID(c *gin.Context) {
	uid := c.Param("uid")
	groupRole, err := getGroupMemberByUIDFromDB(pg.Conn, uid)

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
func (pg *PgModel) getGroupRoles(c *gin.Context) {
	gid := c.Param("groupId")
	gidInt, err := strconv.Atoi(gid)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	careGroups, err := getAllGroupRolesFromDB(pg.Conn, gidInt)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, careGroups)
}
