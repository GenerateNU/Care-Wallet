package labels

import (
	"carewallet/models"
	"strconv"

	"github.com/jackc/pgx"
)

func CreateNewLabelInDB(pool *pgx.Conn, requestBody LabelCreation) (models.Label, error) {
	groupID := requestBody.GroupID
	labelName := requestBody.LabelName
	labelColor := requestBody.LabelColor

	_, err := pool.Exec("INSERT INTO label (group_id, label_name, label_color) VALUES ($1, $2, $3)", groupID, labelName, labelColor)

	if err != nil {
		print(err.Error())
		return models.Label{}, err
	}

	label := models.Label{
		GroupID:    groupID,
		LabelName:  labelName,
		LabelColor: labelColor,
	}
	return label, nil
}

func DeleteLabelFromDB(pool *pgx.Conn, groupID string, labelName string) error {
	groupIDInt, err := strconv.Atoi(groupID)
	if err != nil {
		return err
	}

	_, err = pool.Exec("DELETE FROM label WHERE group_id = $1 AND label_name = $2", groupIDInt, labelName)
	if err != nil {
		return err
	}

	return nil
}
