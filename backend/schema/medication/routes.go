package medication

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

func GetMedicationGroup(v1 *gin.RouterGroup, c *PgModel) *gin.RouterGroup {

	medications := v1.Group("medications")
	{
		medications.GET("", c.GetMedications)
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
		panic(err)
	}

	c.JSON(http.StatusOK, med)
}
