package labels

import (
	"carewallet/models"

	"github.com/jackc/pgx"
)

func CreateNewLabelInDB(pool *pgx.Conn, requestBody LabelCreation) (models.Label, error) {
	groupID := requestBody.GroupID
	labelName := requestBody.LabelName
	labelColor := requestBody.LabelColor

	_, err := pool.Exec("INSERT INTO label (group_id, label_name, label_color) VALUES ($1, $2, $3)", groupID, labelName, labelColor)

	if err != nil {
		return models.Label{}, err
	}

	label := models.Label{
		GroupID:    groupID,
		LabelName:  labelName,
		LabelColor: labelColor,
	}
	return label, nil
}
