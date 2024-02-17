package groups

import (
	"carewallet/models"
	"strconv"

	"github.com/jackc/pgx"
)

func CreateCareGroupsFromDB(conn *pgx.Conn, groupName string) (int, error) {

	var caregroup models.CareGroup

	err := conn.QueryRow("INSERT INTO care_group (group_name, date_created) VALUES ($1, Now()) RETURNING *", groupName).Scan(&caregroup.GroupID, &caregroup.GroupName, &caregroup.DateCreated)

	if err != nil {
		print(err, "from transactions err ")

		return -1, err
	}

	return caregroup.GroupID, nil

}

func AddUserCareGroupFromDB(conn *pgx.Conn, groupId string, groupMember GroupMember) (int, error) {

	var returningGroupId int
	err := conn.QueryRow("INSERT INTO group_roles (group_id, user_id, role) VALUES ($1, $2, $3) RETURNING group_id", groupId, groupMember.UserId, groupMember.Role).Scan(&returningGroupId)

	if err != nil {
		print(err, "from transactions err ")
		return -1, err
	}

	return returningGroupId, nil

}

// Return all members of a group (by user_id)
func GetGroupFromDB(conn *pgx.Conn, groupId string) (models.CareGroup, error) {
	var caregroup models.CareGroup
	groupIdInt, _ := strconv.Atoi(groupId)
	err := conn.QueryRow("SELECT * FROM care_group WHERE group_id = $1", groupIdInt).Scan(&caregroup.GroupID, &caregroup.GroupName, &caregroup.DateCreated)

	if err != nil {
		print(err, "from transactions err ")
		return models.CareGroup{}, err
	}

	return caregroup, nil
}

// Remove a user from a group (using group_id and user_id)
func RemoveUserFromGroupFromDB(conn *pgx.Conn, groupId int, userId int) (models.GroupRole, error) {

	var grouprole models.GroupRole

	err := conn.QueryRow("DELETE FROM group_roles WHERE group_id = $1 and user_id = $2 RETURNING group_id, user_id", groupId, userId).Scan(&grouprole.GroupID, &grouprole.UserID)

	if err != nil {
		print(err, "from transactions err ")

		return models.GroupRole{}, err
	}

	return grouprole, nil

}

// Remove a user from a group (using group_id and user_id)
func ChangeUserGroupRoleInDB(conn *pgx.Conn, groupId int, userId int, newgroupId int) (models.GroupRole, error) {

	var grouprole models.GroupRole

	err := conn.QueryRow("UPDATE group_roles SET group_id = $2 WHERE user_id = $3 AND group_id = $1; RETURNING group_id, user_id", groupId, newgroupId, userId).Scan(&grouprole.GroupID, &grouprole.UserID)

	if err != nil {
		print(err, "from transactions err ")

		return models.GroupRole{}, err
	}

	return grouprole, nil

}
