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
		files.POST("/upload", c.uploadFile)
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
//	@param			notes		formData	string	true	"Notes for the file"
//	@param			label_name	formData	string	false	"Label name for the file"
//
//	@success		200			{object}	models.File
//	@failure		400			{object}	string
//	@router			/files/upload [post]
func (pg *PgModel) uploadFile(c *gin.Context) {
	var file models.File

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to get form")
		return
	}

	fileResponse := form.File["file_data"][0]
	file.UploadBy = form.Value["upload_by"][0]
	file.GroupID, err = strconv.Atoi(form.Value["group_id"][0])
	file.Notes = form.Value["notes"][0]
	file.LabelName = form.Value["label_name"][0]

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

	err = uploadFile(pg.Conn, file, fileResponse, fileData)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to create file: "+err.Error())
		return
	}

	c.JSON(http.StatusOK, file)
}
