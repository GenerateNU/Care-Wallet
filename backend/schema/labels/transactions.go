package labels

import (
	"carewallet/models"
	"strconv"

	"github.com/jackc/pgx"
)

func CreateNewLabelInDB(pool *pgx.Conn, requestBody LabelData) (models.Label, error) {
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

func EditLabelInDB(pool *pgx.Conn, groupID string, labelName string, data LabelData) (models.Label, error) {
	groupIDInt, err := strconv.Atoi(groupID)
	if err != nil {
		return models.Label{}, err
	}

	_, err = pool.Exec("UPDATE label SET label_color = $1, label_name = $2 WHERE group_id = $3 AND label_name = $4", data.LabelColor, data.LabelName, groupIDInt, labelName)
	if err != nil {
		print(err.Error())
		return models.Label{}, err
	}

	// Is there a better way to do this when we don't know which fields are being edited?
	editedName := data.LabelName
	if editedName == "" {
		editedName = labelName
	}

	var label = models.Label{
		GroupID:   groupIDInt,
		LabelName: editedName,
	}

	err = pool.QueryRow("SELECT label_color FROM label WHERE group_id = $1 AND label_name = $2", groupIDInt, editedName).Scan(&label.LabelColor)
	if err != nil {
		return models.Label{}, err
	}

	return label, nil
}
