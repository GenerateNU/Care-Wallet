package files

import (
	"carewallet/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgModel struct {
	Conn *pgxpool.Pool
}

func FileGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	files := v1.Group("files")
	{
		files.POST("/upload", c.UploadFile)
		files.DELETE("/:fileID", c.RemoveFile) 
        files.GET("/:fileID", c.GetFile)      
	}

	return files
}

// UploadFile godoc
//
//	@summary		Upload a file
//	@description	Upload a file to database and S3 bucket
//	@tags			file
//
//	@param			file_data	formData	file	true	"Body with file zip"
//	@param			upload_by	formData	string	true	"The userId of the uploader"
//	@param			group_id	formData	int		true	"The groupId of the uploader"
//
//	@success		200			{object}	models.File
//	@failure		400			{object}	string
//	@router			/files/upload [post]
func (pg *PgModel) UploadFile(c *gin.Context) {
	var file models.File

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to get form")
		return
	}

	fileResponse := form.File["file_data"][0]
	file.UploadBy = form.Value["upload_by"][0]
	file.GroupID, err = strconv.Atoi(form.Value["group_id"][0])

	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to parse groupid")
		return
	}

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


// RemoveFile godoc
//
//	@summary		Remove a file
//	@description	Remove a file from database and S3 bucket
//	@tags			file
//
//	@param			fileID	path	string	true	"The fileID of the file to remove"
//
//	@success		200			{object}	string
//	@failure		400			{object}	string
//	@router			/files/{fileID} [delete]
func (pg *PgModel) RemoveFile(c *gin.Context) {
    fileID := c.Param("fileID")
    // You might want to validate fileID here

    err := RemoveFile(pg.Conn, fileID)
    if err != nil {
        c.JSON(http.StatusBadRequest, "Failed to remove file: "+err.Error())
        return
    }

    c.Status(http.StatusOK)
}

// GetFile godoc
//
//	@summary		Get a file
//	@description	Get a file from S3 bucket
//	@tags			file
//
//	@param			fileID	path	string	true	"The fileID of the file to get"
//
//	@success		200			{object}	string
//	@failure		400			{object}	string
//	@router			/files/{fileID} [get]
func (pg *PgModel) GetFile(c *gin.Context) {
    fileID := c.Param("fileID")
    // You might want to validate fileID here

    url, err := GetFileURL(pg.Conn, fileID)
    if err != nil {
        c.JSON(http.StatusBadRequest, "Failed to get file: "+err.Error())
        return
    }

    c.Redirect(http.StatusTemporaryRedirect, url)
}
