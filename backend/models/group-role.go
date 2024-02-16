package models

type Role string

const (
	RolePatient   Role = "PATIENT"
	RolePrimary   Role = "PRIMARY"
	RoleSecondary Role = "SECONDARY"
)

type GroupRole struct {
	GroupID int    `json:"group_id"`
	UserID  string `json:"user_id"`
	Role    Role   `json:"role"`
}
