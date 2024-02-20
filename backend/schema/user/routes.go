package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func UserGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	userGroup := v1.Group("user")
	{
		userGroup.GET("/:uid", c.GetUser)
		userGroup.POST("/:uid", c.CreateUser)
		userGroup.PUT("/:uid", c.UpdateUser)
	}

	return userGroup
}

type UserInfoBody struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Address   string `json:"address"`
}

// CreateUser godoc
//
//	@summary		Creates a user
//	@description	Creates a new user with the provided userId.
//	@tags			user
//
//	@param			uid			path		string			true	"User ID"
//	@param			UserInfo	body		UserInfoBody	true	"User Information"
//
//	@success		200			{object}	models.User
//	@failure		400			{object}	string
//	@router			/user/{uid} [POST]
func (pg *PgModel) CreateUser(c *gin.Context) {
	var requestBody UserInfoBody

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := CreateUserInDB(pg.Conn, c.Param("uid"), requestBody)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}

// GetUser godoc
//
//	@summary		gets the information about a user
//	@description	gets the information about a user given their user id
//	@tags			user
//
//	@param			uid	path		string	true	"User ID"
//
//	@success		200	{object}	models.User
//	@failure		400	{object}	string
//	@router			/user/{uid} [GET]
func (pg *PgModel) GetUser(c *gin.Context) {
	user, err := GetUserInDB(pg.Conn, c.Param("uid"))

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}

// UpdateUser godoc
//
//	@summary		Updates a user
//	@description	Updates a user with the provided userId given the updated user.
//	@tags			user
//
//	@param			uid			path		string			true	"User ID"
//	@param			UserInfo	body		UserInfoBody	true	"User Information"
//
//	@success		200			{object}	models.User
//	@failure		400			{object}	string
//	@router			/user/{uid} [PUT]
func (pg *PgModel) UpdateUser(c *gin.Context) {
	var requestBody UserInfoBody

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := UpdateUserInDB(pg.Conn, c.Param("uid"), requestBody)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}