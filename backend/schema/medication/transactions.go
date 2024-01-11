package medication

import (
	"carewallet/types"

	"github.com/jackc/pgx"
)

func GetAllMedsFromDB(pool *pgx.Conn) ([]types.Medication, error) {
	rows, err := pool.Query("SELECT medication_id, medication_name FROM medication;")

	if err != nil {
		print(err, "from transactions err ")

		return nil, err
	}

	defer rows.Close()

	var results []types.Medication

	for rows.Next() {
		med := types.Medication{}
		err := rows.Scan(&med.MedicationID, &med.MedicationName)

		if err != nil {
			print(err, "from transactions err2 ")

			return nil, err
		}

		results = append(results, med)
	}

	return results, nil
}
