package user

import (
	"carewallet/models"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgModel struct {
	Conn *pgxpool.Pool
}

func UserGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {
	userGroup := v1.Group("user")
	{
		userGroup.GET("/:uid", c.getUser)
		userGroup.GET("", c.getUsers)
		userGroup.POST("/:uid", c.createUser)
		userGroup.PUT("/:uid", c.updateUser)
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
func (pg *PgModel) createUser(c *gin.Context) {
	var requestBody UserInfoBody

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := createUserInDB(pg.Conn, c.Param("uid"), requestBody)

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
func (pg *PgModel) getUser(c *gin.Context) {
	user, err := getUserInDB(pg.Conn, c.Param("uid"))

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}

type UsersQuery struct {
	UserIDs []string `form:"userIDs"`
}

// GetUsers godoc
//
//	@summary		gets the information about multiple users
//	@description	gets the information about multiple users given their user id
//	@tags			user
//
//	@param			userIDs	query		[]string	true	"User IDs"
//
//	@success		200		{array}		models.User
//	@failure		400		{object}	string
//	@router			/user [GET]
func (pg *PgModel) getUsers(c *gin.Context) {

	userIDs := c.Query("userIDs")
	userQuery := UsersQuery{
		UserIDs: strings.Split(userIDs, ","),
	}

	var users []models.User

	for _, element := range userQuery.UserIDs {
		user, err := getUserInDB(pg.Conn, element)
		if err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, users)
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
func (pg *PgModel) updateUser(c *gin.Context) {
	var requestBody UserInfoBody

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := updateUserInDB(pg.Conn, requestBody)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}
