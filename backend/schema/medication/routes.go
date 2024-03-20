package medication

import (
	"carewallet/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
)

type PgModel struct {
	Conn *pgx.Conn
}

func GetMedicationGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	medications := v1.Group("medications")
	{
		medications.GET("", c.GetMedications)
		medications.POST("", c.AddMedications)
	}

	return medications
}

// GetMedications godoc
//
//	@summary		Get All Meds
//	@description	get all user medications
//	@tags			medications
//	@success		200	{array}	models.Medication
//	@router			/medications [get]
func (pg *PgModel) GetMedications(c *gin.Context) {
	med, err := GetAllMedsFromDB(pg.Conn)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, med)
}

// AddMedications godoc
//
//	@summary		add a medication
//	@description	add a medication to a users medlist
//	@tags			medications
//
//	@param			_	body		models.Medication	true	"a medication"
//
//	@success		200	{object}	models.Medication
//	@failure		400	{object}	string
//	@router			/medications [post]
func (pg *PgModel) AddMedications(c *gin.Context) {
	var medbody models.Medication
	c.Bind(&medbody)

	med, err := AddMedToDB(pg.Conn, medbody)

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, med)
}
