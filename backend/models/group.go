package models

import (
	"time"
)

type CareGroup struct {
	GroupID     int       `json:"group_id"`
	GroupName   string    `json:"group_name"`
	DateCreated time.Time `json:"date_created"`
}
