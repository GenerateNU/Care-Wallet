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

func CreateCareGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	careGroups := v1.Group("care-groups")
	{
		careGroups.POST("/:groupName", func(ctx *gin.Context) {
			groupName := ctx.Param("groupName")
			c.CreateCareGroups(ctx, groupName)
		})
		careGroups.POST("/addUser/:userId/:groupId/:role", func(ctx *gin.Context) {
			userId := ctx.Param("userId")
			groupId := ctx.Param("groupId")
			role := ctx.Param("role")
			c.AddUserCareGroup(ctx, userId, groupId, role)
		})
		careGroups.GET("/get-members/:groupId", c.GetGroupMembers)
	}

	return careGroups
}

// CreateCareGroup godoc
//
//	@summary		Creates a care group
//	@description	Creates a new care group with the provided group name.
//	@tags			groups
//	@success		200	{array}	models.CareGroup
//	@router			/care-groups/:groupName [post]
func (pg *PgModel) CreateCareGroups(c *gin.Context, groupName string) {
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
//	@tags			groups
//	@success		200	{array}		models.CareGroup
//	@failure		400	{object}	string
//	@router			/care-groups/addUser/:userId/:groupId/:role [post]
func (pg *PgModel) AddUserCareGroup(c *gin.Context, userId string, groupId string, role string) {
	user, err := AddUserCareGroupFromDB(pg.Conn, userId, groupId, role)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, user)

}

// GetGroupMembers godoc
//
// @summary Get all members from a group
// @description retrieve all users in given group id
// @tags groups
//
// @param groupId path string true "group id"
//
// @success 200 {array} string
// @failure 400 {object} string
// @router /care-groups/get-members/{groupId} [get]
func (pg *PgModel) GetGroupMembers(c *gin.Context) {
	groupId := c.Param("groupId")
	members, err := GetGroupMembersFromDB(pg.Conn, groupId)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, members)
}
