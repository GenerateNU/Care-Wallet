package labels

import (
	"carewallet/models"
	"context"
	"strconv"

	"github.com/jackc/pgx/v5/pgxpool"
)

func getLabelsByGroupFromDB(pool *pgxpool.Pool, groupID string) ([]models.Label, error) {
	groupIDInt, err := strconv.Atoi(groupID)
	if err != nil {
		return nil, err
	}

	rows, err := pool.Query(context.Background(), "SELECT label_name, label_color FROM label WHERE group_id = $1", groupIDInt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var results []models.Label

	for rows.Next() {
		label := models.Label{}
		err := rows.Scan(&label.LabelName, &label.LabelColor)
		if err != nil {
			return nil, err
		}
		label.GroupID = groupIDInt
		results = append(results, label)
	}

	return results, nil

}

func createNewLabelInDB(pool *pgxpool.Pool, groupID int, requestBody LabelData) (models.Label, error) {
	labelName := requestBody.LabelName
	labelColor := requestBody.LabelColor

	_, err := pool.Exec(context.Background(), "INSERT INTO label (group_id, label_name, label_color) VALUES ($1, $2, $3)", groupID, labelName, labelColor)

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

func deleteLabelFromDB(pool *pgxpool.Pool, groupID string, labelName string) error {
	groupIDInt, err := strconv.Atoi(groupID)
	if err != nil {
		return err
	}

	_, err = pool.Exec(context.Background(), "DELETE FROM label WHERE group_id = $1 AND label_name = $2", groupIDInt, labelName)
	if err != nil {
		return err
	}

	return nil
}

func editLabelInDB(pool *pgxpool.Pool, groupID string, labelName string, data LabelData) (models.Label, error) {
	groupIDInt, err := strconv.Atoi(groupID)
	if err != nil {
		return models.Label{}, err
	}

	_, err = pool.Exec(context.Background(), "UPDATE label SET label_color = $1, label_name = $2 WHERE group_id = $3 AND label_name = $4", data.LabelColor, data.LabelName, groupIDInt, labelName)
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

	err = pool.QueryRow(context.Background(), "SELECT label_color FROM label WHERE group_id = $1 AND label_name = $2", groupIDInt, editedName).Scan(&label.LabelColor)
	if err != nil {
		return models.Label{}, err
	}

	return label, nil
}
