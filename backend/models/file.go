package models

type File struct {
	FileID     int    `json:"file_id"`
	FileName   string `json:"file_name"`
	ObjectKey  string `json:"object_key"`
	GroupID    string `json:"group_id"`
	UploadBy   string `json:"upload_by"`
	UploadDate string `json:"upload_date"`
	TaskID     int    `json:"task_id"`
	FileSize   int64  `json:"file_size"`
}
