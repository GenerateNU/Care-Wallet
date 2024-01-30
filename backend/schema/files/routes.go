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

func GetFileGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	files := v1.Group("files")
	{
		files.POST("/upload", c.UploadFileRoute)
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
	userID := c.GetHeader("user_id")
	groupID := c.GetHeader("group_id")
	file.UploadBy, _ = strconv.Atoi(userID)
	file.GroupID, _ = strconv.Atoi(groupID)

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to get form")
		return
	}

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