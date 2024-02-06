package users

import (
	"fmt"

	"github.com/jackc/pgx"
)

// GetGroupIDByUIDFromDB returns the groupID of a user given their UID
func GetGroupIDByUIDFromDB(pool *pgx.Conn, uid string) (int, error) {
	var groupID int
	err := pool.QueryRow("SELECT group_id FROM users WHERE uid = $1", uid).Scan(&groupID)

	if err != nil {
		fmt.Printf("error getting groupID from UID: %v", err)
		return 0, err
	}

	return groupID, nil
}
