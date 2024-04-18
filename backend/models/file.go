package models

type File struct {
	FileID     int    `json:"file_id"`
	FileName   string `json:"file_name"`
	GroupID    int    `json:"group_id"`
	UploadBy   string `json:"upload_by"`
	UploadDate string `json:"upload_date"`
	FileSize   int64  `json:"file_size"`
	TaskID     int    `json:"task_id"`
	Notes      string `json:"notes"`
	LabelName  string `json:"label_name"`
}
