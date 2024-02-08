package users

import (
	"carewallet/models"
	"fmt"

	"github.com/jackc/pgx"
)

// GetGroupIDByUIDFromDB returns the groupID of a user given their UID
func GetGroupIDByUIDFromDB(pool *pgx.Conn, uid string) (int, error) {
	var groupID int
	err := pool.QueryRow("SELECT group_id FROM group_roles WHERE user_id = $1", uid).Scan(&groupID)

	if err != nil {
		fmt.Printf("Error getting group_id from user_id: %v", err)
		return 0, err
	}

	return groupID, nil
}

// Get all group roles from the DB
func GetAllGroupRolesFromDB(pool *pgx.Conn) ([]models.GroupRole, error) {
	rows, err := pool.Query("SELECT group_id, user_id, role FROM group_roles;")

	if err != nil {
		print(err, "from transactions err ")

		return nil, err
	}

	defer rows.Close()

	var results []models.GroupRole

	for rows.Next() {
		gr := models.GroupRole{}
		err := rows.Scan(&gr.GroupID, &gr.UserID, &gr.Role)

		if err != nil {
			print(err, "from transactions err2 ")

			return nil, err
		}

		results = append(results, gr)
	}

	return results, nil
}
