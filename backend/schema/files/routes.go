package files

import (
	"carewallet/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func GetFileGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	files := v1.Group("files")
	{
		files.POST("/upload", c.UploadFileRoute)
		files.DELETE("/:fid", c.DeleteFileRoute)
	}

	return files
}

// GetFiles godoc
//
//	@summary		Upload a file
//	@description	Upload a file to database and S3 bucket
//	@tags			file
//	@success		200
//	@router			/files/upload [post]
func (pg *PgModel) UploadFileRoute(c *gin.Context) {
	// TODO: Ensure Swagger Knows about there bad request returns!!!
	var file models.File

	if err := c.Bind(&file); err != nil {
		c.JSON(http.StatusBadRequest, "Failed to process the request")
		return
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to get form")
		return
	}

	// TODO update based on file model when confirmed
	fileResponse := form.File["file_data"][0]
	fileData, err := fileResponse.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to open file")
		return
	}

	defer fileData.Close()

	err = UploadFile(pg.Conn, file, fileResponse, fileData)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to create file: "+err.Error())
		return
	}

	c.JSON(http.StatusOK, file)
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

	c.JSON(http.StatusOK, gin.H{"error": "File deleted"})
}
