package files

import (
	"carewallet/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

// routes might not work bc under the same path
func GetFileGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	files := v1.Group("files")
	{
		files.POST("/", c.UploadFileRoute)
		files.DELETE("/:fname", c.DeleteFileRoute)
	}

	return files
}

// GetFiles godoc
//
//	@summary		Upload a file
//	@description	Upload a file to database and S3 bucket
//	@tags			file
//	@success		201
//	@router			/files [post]
func (pg *PgModel) UploadFileRoute(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get form"})
		return
	}

	// TODO update based on file model when confirmed
	fileResponse := form.File["file_data"][0]
	userID, err := strconv.Atoi(form.Value["user_id"][0])
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get user ID"})
		return
	}
	groupID, err := strconv.Atoi(form.Value["group_id"][0])
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get group ID"})
		return
	}

	uploadDate := time.Now().String()

	// Create a file object:
	file := models.File{
		FileName:   fileResponse.Filename,
		FileSize:   fileResponse.Size,
		GroupID:    groupID,
		UploadBy:   userID,
		UploadDate: uploadDate,
	}

	fileData, err := fileResponse.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to open file"})
		return
	}
	defer fileData.Close()

	err = UploadFile(pg.Conn, file, fileData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create file: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, file)
	return
}

// GetFiles godoc
//
//	@summary		Delete a file
//	@description	Delete a file from database and S3 bucket
//	@tags			file
//	@success		204
//	@router			/files/{fname} [delete]
func (pg *PgModel) DeleteFileRoute(c *gin.Context) {
	fileName := c.Param("fname")

	if err := DeleteFile(pg.Conn, fileName, false); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Failed to delete file" + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File deleted"})
	return
}
