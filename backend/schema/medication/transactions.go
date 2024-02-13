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

func AddMedToDB(pool *pgx.Conn, med models.Medication) (models.Medication, error) {
	err := pool.QueryRow("INSERT INTO medication (medication_id, medication_name) VALUES ($1, $2) RETURNING medication_id;",
		med.MedicationID, med.MedicationName).Scan(&med.MedicationID)

	if err != nil {
		print(err.Error())
		return models.Medication{}, err
	}

	return med, nil
}
