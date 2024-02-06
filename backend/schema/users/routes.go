package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func GetUsersGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	users := v1.Group("users")
	{
		users.GET("/getgroup/:uid", c.GetGroupIDByUID)
	}

	return users
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
// @router /users/getgroup/{uid} [get]
func (pg *PgModel) GetGroupIDByUID(c *gin.Context) {
	uid := c.Param("uid")
	groupID, err := GetGroupIDByUIDFromDB(pg.Conn, uid)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, groupID)
}
