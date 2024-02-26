package models

type Label struct {
	GroupID    int    `json:"group_id"`
	LabelName  string `json:"label_name"`
	LabelColor string `json:"label_color"`
}
