package groups

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func CreateCareGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	careGroups := v1.Group("care-groups")
	{
		careGroups.POST("/:groupName", func(ctx *gin.Context) {
			groupName := ctx.Param("groupName")
			c.CreateCareGroups(ctx, groupName)
		})
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
		panic(err)
	}

	c.JSON(http.StatusOK, careGroups)
}
