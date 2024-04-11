package grouproles

import (
	"carewallet/models"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func changeUserGroupRoleInDB(pool *pgxpool.Pool, gid int, uid string, role string) error {
	_, err := pool.Exec(context.Background(), "UPDATE group_roles SET role = $1 WHERE group_id = $2 AND user_id = $3", role, gid, uid)

	if err != nil {
		fmt.Printf("Error changing group role: %v", err)
		return err
	}

	return nil
}

func addUserToGroupInDB(pool *pgxpool.Pool, gid int, uid string, role string) (models.GroupRole, error) {
	var groupMember models.GroupRole
	err := pool.QueryRow(context.Background(), "INSERT into group_roles (group_id, user_id, role) VALUES ($1, $2, $3) RETURNING *", gid, uid, role).Scan(&groupMember.GroupID, &groupMember.UserID, &groupMember.Role)

	if err != nil {
		fmt.Printf("Error getting group_id from user_id: %v", err)
		return groupMember, err
	}

	return groupMember, nil
}

func removeUserFromGroupInDB(pool *pgxpool.Pool, gid int, uid string) error {
	_, err := pool.Exec(context.Background(), "DELETE from group_roles WHERE group_id = $1 AND user_id = $2", gid, uid)

	if err != nil {
		fmt.Printf("Error getting group_id from user_id: %v", err)
		return err
	}

	return nil
}

// GetGroupIDByUIDFromDB returns the groupID of a user given their UID
func getGroupMemberByUIDFromDB(pool *pgxpool.Pool, uid string) (models.GroupRole, error) {
	var groupMember models.GroupRole
	err := pool.QueryRow(context.Background(), "SELECT * FROM group_roles WHERE user_id = $1", uid).Scan(&groupMember.GroupID, &groupMember.UserID, &groupMember.Role)

	if err != nil {
		fmt.Printf("Error getting group_id from user_id: %v", err)
		return groupMember, err
	}

	return groupMember, nil
}

// Get all group roles from the DB
func getAllGroupRolesFromDB(pool *pgxpool.Pool, gid int) ([]models.GroupRole, error) {
	rows, err := pool.Query(context.Background(), "SELECT group_id, user_id, role FROM group_roles WHERE group_id = $1;", gid)

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
			print(err.Error(), "from transactions err2 ")

			return nil, err
		}

		results = append(results, gr)
	}

	return results, nil
}
