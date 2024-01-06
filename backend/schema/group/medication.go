package group

import (
	"carewallet/backend/schema/medication"

	"github.com/gin-gonic/gin"
)

func GetMedicationGroup(v1 *gin.RouterGroup, c *medication.PgModel) *gin.RouterGroup {

	medications := v1.Group("medications")
	{
		medications.GET("", c.GetMedications)
	}

	return medications
}
