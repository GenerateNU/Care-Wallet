package files

import (
	"carewallet/models"
	"fmt"
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
		files.DELETE("/:groupId/:fileName", c.removeFile)
		files.GET("/:groupId/:fileId", c.getFile)
		files.GET("/:groupId", c.listFiles)
		files.GET("/profile/:fileName", c.getProfilePhoto)
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

// RemoveFile godoc
//
//	@summary		Remove a file
//	@description	Remove a file from S3 bucket
//	@tags			file
//
//	@param			groupId		path		string	true	"The groupID of the file"
//	@param			fileName	path		string	true	"The fileName of the file"
//
//	@success		200			{object}	string
//	@failure		400			{object}	string
//	@router			/files/{groupId}/{fileName} [delete]
func (pg *PgModel) removeFile(c *gin.Context) {
	groupID := c.Param("groupId")
	fileName := c.Param("fileName")

	// Validate the input parameters as needed
	if groupID == "" || fileName == "" {
		c.JSON(http.StatusBadRequest, "Missing groupID or fileName")
		return
	}

	err := removeFile(pg.Conn, groupID, fileName)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to remove file: "+err.Error())
		return
	}

	c.Status(http.StatusOK)
}

// getFile godoc
//
//	@summary		Get a file
//	@description	Get a file from S3 bucket
//	@tags			file
//
//	@param			groupId	path		string	true	"The groupID of the file"
//	@param			fileId	path		string	true	"The fileId of the file"
//
//	@success		200		{object}	string
//	@failure		400		{object}	string
//	@router			/files/{groupId}/{fileName} [get]
func (pg *PgModel) getFile(c *gin.Context) {
	groupID := c.Param("groupId")
	fileId := c.Param("fileId")

	// Validate the input parameters as needed
	if groupID == "" || fileId == "" {
		fmt.Println("Missing groupId or fileName")
		c.JSON(http.StatusBadRequest, "Missing groupID or fileName")
		return
	}

	url, err := getFileURL(pg.Conn, groupID, fileId)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to get file: "+err.Error())
		return
	}

	c.JSON(http.StatusOK, url)
}

// listFiles godoc
//
//	@summary		List all files
//	@description	List all files from S3 bucket
//	@tags			file
//
//	@param			groupId	path		string	true	"The groupID of the file"
//
//	@success		200		{object}	[]FileDetails
//	@failure		400		{object}	string
//	@router			/files/{groupId} [get]
func (pg *PgModel) listFiles(c *gin.Context) {
	groupID := c.Param("groupId")

	// Validate the input parameters as needed
	if groupID == "" {
		fmt.Println("Missing groupId")
		c.JSON(http.StatusBadRequest, "Missing groupID")
		return
	}

	url, err := getAllFileURLs(pg.Conn, groupID)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to get file: "+err.Error())
		return
	}

	c.JSON(http.StatusOK, url)
}

// getProfilePhoto godoc
//
//	@summary		get profile photo
//	@description	get profile photo from S3 bucket
//	@tags			file
//
//	@param			fileName	path		string	true	"the file name of the profile photo"
//
//	@success		200			{object}	string
//	@failure		400			{object}	string
//	@router			/files/profile/{fileName} [get]
func (pg *PgModel) getProfilePhoto(c *gin.Context) {
	fileName := c.Param("fileName")

	// Validate the input parameters as needed
	if fileName == "" {
		fmt.Println("Missing fileName")
		c.JSON(http.StatusBadRequest, "Missing fileName")
		return
	}

	url, err := getProfilePhotoURL(fileName)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to get file: "+err.Error())
		return
	}

	c.JSON(http.StatusOK, url)
}
