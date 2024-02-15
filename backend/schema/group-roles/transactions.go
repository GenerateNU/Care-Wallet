package grouproles

import (
	"carewallet/models"
	"fmt"

	"github.com/jackc/pgx"
)

// GetGroupIDByUIDFromDB returns the groupID of a user given their UID
func GetGroupMemberByUIDFromDB(pool *pgx.Conn, uid string) (models.GroupRole, error) {
	var groupMember models.GroupRole
	err := pool.QueryRow("SELECT * FROM group_roles WHERE user_id = $1", uid).Scan(&groupMember.GroupID, &groupMember.UserID, &groupMember.Role)

	if err != nil {
		fmt.Printf("Error getting group_id from user_id: %v", err)
		return groupMember, err
	}

	return groupMember, nil
}

// Get all group roles from the DB
func GetAllGroupRolesFromDB(pool *pgx.Conn, gid int) ([]models.GroupRole, error) {
	rows, err := pool.Query("SELECT group_id, user_id, role FROM group_roles WHERE group_id = $1;", gid)

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
