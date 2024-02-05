package groups

import (
	"errors"

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
