package groups

import (
	"errors"
	"strconv"

	"github.com/jackc/pgx"
)

func CreateCareGroupsFromDB(conn *pgx.Conn, groupName string) (int, error) {

	rows, err := conn.Exec("INSERT INTO care_group (group_name, date_created) VALUES ($1, NOW())", groupName)

	if err != nil {
		print(err, "from transactions err ")

		return 0, err
	}

	// Check the number of rows affected by the insert operation
	rowsAffected := rows.RowsAffected()

	if rowsAffected != 1 {
		return 0, errors.New("unexpected number of rows affected")
	}

	var careGroupID int
	err = conn.QueryRow("SELECT lastval()").Scan(&careGroupID)
	if err != nil {
		return 0, err
	}

	return careGroupID, nil

}

func AddUserCareGroupFromDB(conn *pgx.Conn, userId string, groupId string, role string) (int, error) {

	rows, err := conn.Exec("INSERT INTO group_roles (group_id, user_id, role) VALUES ($1, $2, $3)", groupId, userId, role)

	if err != nil {
		print(err, "from transactions err ")
		return 0, err
	}

	// Check the number of rows affected by the insert operation
	rowsAffected := rows.RowsAffected()

	if rowsAffected != 1 {
		return 0, errors.New("unexpected number of rows affected")
	}

	var lastUserId int
	err = conn.QueryRow("SELECT lastval()").Scan(&lastUserId)
	if err != nil {
		return 0, err
	}

	return lastUserId, nil

}

// Return all members of a group (by user_id)
func GetGroupMembersFromDB(conn *pgx.Conn, groupId string) ([]string, error) {
	groupIdInt, _ := strconv.Atoi(groupId)
	rows, err := conn.Query("SELECT user_id FROM group_roles WHERE group_id = $1", groupIdInt)

	if err != nil {
		print(err, "from transactions err ")
		return nil, err
	}

	defer rows.Close()

	var results []string

	// iterate through the rows and append the user_id to the results slice
	for rows.Next() {
		var userId string
		err := rows.Scan(&userId)
		if err != nil {
			print(err, "from transactions err2 ")
			return nil, err
		}
		results = append(results, userId)
	}

	return results, nil
}
