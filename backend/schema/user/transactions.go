package user

import (
	"carewallet/models"

	"github.com/jackc/pgx"
)

func CreateUserInDB(conn *pgx.Conn, uid string, requestBody UserInfoBody) (models.User, error) {
	var user models.User

	err := conn.QueryRow("INSERT INTO users (user_id, first_name, last_name, phone, email, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, first_name, last_name, phone, email, address", uid, requestBody.FirstName, requestBody.LastName, requestBody.Phone, requestBody.Email, requestBody.Address).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Phone, &user.Email, &user.Address)

	if err != nil {
		print(err.Error(), "from transactions err ")
		return models.User{}, err
	}

	return user, nil
}

func UpdateUserInDB(conn *pgx.Conn, uid string, requestBody UserInfoBody) (models.User, error) {
	var user models.User
	err := conn.QueryRow("UPDATE users SET first_name = $1, last_name = $2, phone = $3, email = $4, address = $5 RETURNING user_id, first_name, last_name, phone, email, address", requestBody.FirstName, requestBody.LastName, requestBody.Phone, requestBody.Email, requestBody.Address).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Phone, &user.Email, &user.Address)

	if err != nil {
		print(err.Error(), "from transactions err ")
		return models.User{}, err
	}

	return user, nil
}

func GetUserInDB(conn *pgx.Conn, uid string) (models.User, error) {
	var user models.User
	err := conn.QueryRow("SELECT user_id, first_name, last_name, phone, email, address FROM users WHERE user_id = $1", uid).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Phone, &user.Email, &user.Address)

	if err != nil {
		print(err.Error(), "from transactions err ")
		return models.User{}, err
	}

	return user, nil
}
