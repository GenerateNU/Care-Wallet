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
		users.GET("/get-group/:uid", c.GetGroupIDByUID)
	}
	return users
}

func (pg *PgModel) GetGroupIDByUID(c *gin.Context) {
	uid := c.Param("uid")
	groupID, err := GetGroupIDByUID(pg.Conn, uid)

	if err != nil {
		c.JSON(http.StatusBadRequest, "failed to get groupID from UID")
		return
	}

	c.JSON(http.StatusOK, groupID)
}
