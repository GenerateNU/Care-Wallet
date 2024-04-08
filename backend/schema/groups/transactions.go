package groups

import (
	"carewallet/models"
	"context"
	"strconv"

	"github.com/jackc/pgx/v5/pgxpool"
)

func createCareGroupsFromDB(conn *pgxpool.Pool, groupName string) (int, error) {

	var caregroup models.CareGroup

	err := conn.QueryRow(context.Background(), "INSERT INTO care_group (group_name, date_created) VALUES ($1, Now()) RETURNING *", groupName).Scan(&caregroup.GroupID, &caregroup.GroupName, &caregroup.DateCreated)

	if err != nil {
		print(err, "from transactions err ")

		return -1, err
	}

	return caregroup.GroupID, nil

}

func addUserCareGroupFromDB(conn *pgxpool.Pool, groupId string, groupMember GroupMember) (int, error) {

	var returningGroupId int
	err := conn.QueryRow(context.Background(), "INSERT INTO group_roles (group_id, user_id, role) VALUES ($1, $2, $3) RETURNING group_id", groupId, groupMember.UserId, groupMember.Role).Scan(&returningGroupId)

	if err != nil {
		print(err, "from transactions err ")
		return -1, err
	}

	return returningGroupId, nil

}

// Return all members of a group (by user_id)
func getGroupFromDB(conn *pgxpool.Pool, groupId string) (models.CareGroup, error) {
	var caregroup models.CareGroup
	groupIdInt, _ := strconv.Atoi(groupId)
	err := conn.QueryRow(context.Background(), "SELECT * FROM care_group WHERE group_id = $1", groupIdInt).Scan(&caregroup.GroupID, &caregroup.GroupName, &caregroup.DateCreated)

	if err != nil {
		print(err, "from transactions err ")
		return models.CareGroup{}, err
	}

	return caregroup, nil
}
