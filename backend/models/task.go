package models

import (
	"time"
)

type Task struct {
	TaskID            int        `json:"task_id"`
	TaskTitle         string     `json:"task_title"`
	GroupID           int        `json:"group_id"`
	CreatedBy         string     `json:"created_by"` // User ID
	CreatedDate       time.Time  `json:"created_date"`
	StartDate         *time.Time `json:"start_date"`
	EndDate           *time.Time `json:"end_date"`
	QuickTask         bool       `json:"quick_task"`
	Notes             *string    `json:"notes"`
	Repeating         bool       `json:"repeating"`
	RepeatingInterval *string    `json:"repeating_interval"`
	RepeatingEndDate  *time.Time `json:"repeating_end_date"`
	TaskStatus        string     `json:"task_status"`
	TaskType          string     `json:"task_type"`
	TaskInfo          *string    `json:"task_info"`
}
