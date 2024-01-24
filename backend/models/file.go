package models

type File struct {
	FileID   int    `json:"file_id"`
	FileName string `json:"file_name"`
	FileSize int64  `json:"file_size"`
	User     uint   `json:"user"`
}
