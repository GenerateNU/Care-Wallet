package task_labels

import (
	"carewallet/models"
	"context"

	"github.com/jackc/pgx/v4"
)

func GetLabelsByTaskInDB(conn *pgx.Conn, taskId string) ([]models.Task_Label, error) {
	rows, err := conn.Query(context.Background(), "SELECT * FROM task_labels WHERE task_id = $1", taskId)

	if err != nil {
		print(err.Error(), "error selecting tasks by query")
		return nil, err
	}

	defer rows.Close()

	var results []models.Task_Label

	for rows.Next() {
		task := models.Task_Label{}
		err := rows.Scan(&task.GroupId, &task.TaskId, &task.LabelName)

		if err != nil {
			print(err, "error scanning tasks by query")
			return nil, err
		}

		results = append(results, task)
	}

	return results, nil
}

func AddLabelToTaskInDB(conn *pgx.Conn, requestBody LabelData, taskid string) (models.Task_Label, error) {
	var task_label models.Task_Label
	err := conn.QueryRow(context.Background(), "INSERT INTO task_labels (task_id, group_id, label_name) VALUES ($1, $2, $3) RETURNING *;",
		taskid, requestBody.GroupID, requestBody.LabelName).Scan(&task_label.TaskId, &task_label.GroupId, &task_label.LabelName)

	if err != nil {
		print(err.Error())
		return models.Task_Label{}, err
	}

	return task_label, nil
}

func RemoveLabelFromTaskInDB(conn *pgx.Conn, requestBody LabelData, taskId string) error {
	_, err := conn.Exec(context.Background(), "DELETE FROM task_labels WHERE task_id = $1 AND group_id = $2 AND label_name = $3", taskId, requestBody.GroupID, requestBody.LabelName)

	if err != nil {
		print(err.Error())
		return err
	}

	return nil
}
