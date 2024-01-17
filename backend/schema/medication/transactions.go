package medication

import (
	"carewallet/models"

	"github.com/jackc/pgx"
)

func GetAllMedsFromDB(pool *pgx.Conn) ([]models.Medication, error) {
	rows, err := pool.Query("SELECT medication_id, medication_name FROM medication;")

	if err != nil {
		print(err, "from transactions err ")

		return nil, err
	}

	defer rows.Close()

	var results []models.Medication

	for rows.Next() {
		med := models.Medication{}
		err := rows.Scan(&med.MedicationID, &med.MedicationName)

		if err != nil {
			print(err, "from transactions err2 ")

			return nil, err
		}

		results = append(results, med)
	}

	return results, nil
}
