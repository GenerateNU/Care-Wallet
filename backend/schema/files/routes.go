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
		// files.DELETE("", c.DeleteFileRoute)
		files.POST("/:uid", c.UploadFileRoute)
	}

	return files
}

// GetFiles godoc
//
//	@summary		Upload A File
//	@description	Upload a file to database and S3 bucket
//	@tags			file
//	@success		201
//	@router			/api/files [put]
func (pg *PgModel) UploadFileRoute(c *gin.Context) {
	var file models.File
	userID := c.Param("uid")

	if err := c.Bind(&file); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to process body"})
		return
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get form"})
		return
	}

	fileResponse := form.File["file_data"][0]
	fileData, err := fileResponse.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to open file"})
		return
	}
	defer fileData.Close()

	err = UploadFile(userID, file, fileData)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create file: "+err.Error()})
		return
	}

	c.JSON(http.StatusOK, file)
	return
}