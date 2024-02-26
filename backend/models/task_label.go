package models

type Task_Label struct {
	TaskId    int    `json:"task_id"`
	GroupId   int    `json:"group_id"`
	LabelName string `json:"label_name"`
}
