package files

import (
	"carewallet/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func FileGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	files := v1.Group("files")
	{
		files.POST("/upload", c.UploadFile)
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
