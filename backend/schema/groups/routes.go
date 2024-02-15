package groups

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

type CareGroup struct {
	GroupID     int       `json:"group_id"`
	GroupName   string    `json:"group_name"`
	DateCreated time.Time `json:"date_created"`
}

func GetCareGroups(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	careGroups := v1.Group("")
	{
		careGroups.POST("/create/:groupName", c.CreateCareGroups)
		careGroups.POST("/add/:userId/:groupId/:role", c.AddUserCareGroup)
		careGroups.GET("/:groupId", c.GetGroupMembers)
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
//	@success		200	{array}	models.CareGroup
//	@router			/group/create/{groupName} [post]
func (pg *PgModel) CreateCareGroups(c *gin.Context) {
	groupName := c.Param("groupName")
	careGroups, err := CreateCareGroupsFromDB(pg.Conn, groupName)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, careGroups)
}

// CreateCareGroup godoc
//
//	@summary		Adds a user to a care group
//	@description	Adds a user to a care group given a userID, groupID, and role
//	@tags			group
//
//	@param			userId		path		string	true	"user id"
//	@param			groupId		path		string	true	"group id"
//	@param			role		path		string	true	"role"
//
//	@success		200	{array}		models.CareGroup
//	@failure		400	{object}	string
//	@router			/group/add/{userId}/{groupId}/{role} [post]
func (pg *PgModel) AddUserCareGroup(c *gin.Context) {
	userId := c.Param("userId")
	groupId := c.Param("groupId")
	role := c.Param("role")
	user, err := AddUserCareGroupFromDB(pg.Conn, userId, groupId, role)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, user)

}

// GetGroupMembers godoc
//
//	@summary		Get all members from a group
//	@description	retrieve all users in given group id
//	@tags			group
//
//	@param			groupId	path		string	true	"group id"
//
//	@success		200		{array}		string
//	@failure		400		{object}	string
//	@router			/group/{groupId} [get]
func (pg *PgModel) GetGroupMembers(c *gin.Context) {
	groupId := c.Param("groupId")
	members, err := GetGroupMembersFromDB(pg.Conn, groupId)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, members)
}
