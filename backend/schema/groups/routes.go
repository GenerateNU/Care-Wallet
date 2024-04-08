package groups

import (
	"carewallet/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgModel struct {
	Conn *pgxpool.Pool
}

func CareGroups(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	careGroups := v1.Group("")
	{
		careGroups.POST("/create/:groupName", c.createCareGroups)

		group := v1.Group("/:groupId")
		{
			group.GET("", c.getGroupByGroupId)
			group.POST("add", c.addUserCareGroup)
		}

	}

	return careGroups
}

// CreateCareGroup godoc
//
//	@summary		Creates a care group
//	@description	Creates a new care group with the provided group name.
//	@tags			group
//
//	@param			groupName	path		string	true	"group name"
//
//	@success		200			{object}	int
//	@router			/group/create/{groupName} [post]
func (pg *PgModel) createCareGroups(c *gin.Context) {
	groupName := c.Param("groupName")
	careGroups, err := createCareGroupsFromDB(pg.Conn, groupName)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, careGroups)
}

type GroupMember struct {
	UserId string      `json:"user_id"`
	Role   models.Role `json:"role"`
}

// AddUserCareGroup godoc
//
//	@summary		Adds a user to a care group
//	@description	Adds a user to a care group given a userID, groupID, and role
//	@tags			group
//
//	@param			groupId		path		string		true	"group id"
//	@param			GroupMember	body		GroupMember	true	"The group member to be added"
//
//	@success		200			{object}	int
//	@failure		400			{object}	string
//	@router			/group/{groupId}/add [post]
func (pg *PgModel) addUserCareGroup(c *gin.Context) {
	var requestBody GroupMember
	groupId := c.Param("groupId")

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("Error binding JSON: ", err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	id, err := addUserCareGroupFromDB(pg.Conn, groupId, requestBody)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, id)

}

// GetGroupByGroupId godoc
//
//	@summary		Get a group
//	@description	retrieve the information about a group given its group id
//	@tags			group
//
//	@param			groupId	path		string	true	"group id"
//
//	@success		200		{object}	models.CareGroup
//	@failure		400		{object}	string
//	@router			/group/{groupId} [get]
func (pg *PgModel) getGroupByGroupId(c *gin.Context) {
	groupId := c.Param("groupId")
	group, err := getGroupFromDB(pg.Conn, groupId)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, group)
}
