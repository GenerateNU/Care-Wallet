package user

import (
	"carewallet/models"
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

func createUserInDB(conn *pgxpool.Pool, uid string, requestBody UserInfoBody) (models.User, error) {
	var user models.User

	err := conn.QueryRow(context.Background(), "INSERT INTO users (user_id, first_name, last_name, phone, email, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, first_name, last_name, phone, email, address", uid, requestBody.FirstName, requestBody.LastName, requestBody.Phone, requestBody.Email, requestBody.Address).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Phone, &user.Email, &user.Address)

	if err != nil {
		print(err.Error(), "from transactions err ")
		return models.User{}, err
	}

	return user, nil
}

func updateUserInDB(conn *pgxpool.Pool, requestBody UserInfoBody) (models.User, error) {
	var user models.User
	err := conn.QueryRow(context.Background(), "UPDATE users SET first_name = $1, last_name = $2, phone = $3, email = $4, address = $5 RETURNING user_id, first_name, last_name, phone, email, address", requestBody.FirstName, requestBody.LastName, requestBody.Phone, requestBody.Email, requestBody.Address).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Phone, &user.Email, &user.Address)

	if err != nil {
		print(err.Error(), "from transactions err ")
		return models.User{}, err
	}

	return user, nil
}

func getUserInDB(conn *pgxpool.Pool, uid string) (models.User, error) {
	var user models.User
	err := conn.QueryRow(context.Background(), "SELECT user_id, first_name, last_name, phone, email, address, profile_picture FROM users WHERE user_id = $1", uid).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Phone, &user.Email, &user.Address, &user.ProfilePicture)

	if err != nil {
		print(err.Error(), "from transactions err ")
		return models.User{}, err
	}

	return user, nil
}
