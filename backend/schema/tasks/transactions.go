package tasks

import (
	"carewallet/models"
	"strconv"
	"strings"

	"github.com/jackc/pgx"
)

func GetTasksByGroupIdFromDB(pool *pgx.Conn, groupId string) ([]models.Task, error) {
	groupID, err := strconv.Atoi(groupId)
	if err != nil {
		return nil, err
	}

	rows, err := pool.Query("SELECT task_id, group_id, created_by, created_date, task_status, task_type FROM task WHERE group_id = $1;", groupID)

	if err != nil {
		print(err, "error selecting tasks by group id")

		return nil, err
	}

	defer rows.Close()

	var results []models.Task

	for rows.Next() {
		task := models.Task{}
		err := rows.Scan(&task.TaskID, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.TaskStatus, &task.TaskType)

		if err != nil {
			print(err, "error scanning tasks by group id")

			return nil, err
		}
		results = append(results, task)
	}

	return results, nil
}

func GetTasksByCreatedByFromDB(pool *pgx.Conn, createdBy string) ([]models.Task, error) {
	rows, err := pool.Query("SELECT task_id, group_id, created_by, created_date, task_status, task_type FROM task WHERE created_by = $1;", createdBy)

	if err != nil {
		print(err, "error selecting tasks by user id")

		return nil, err
	}

	defer rows.Close()

	var results []models.Task

	for rows.Next() {
		task := models.Task{}
		err := rows.Scan(&task.TaskID, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.TaskStatus, &task.TaskType)

		if err != nil {
			print(err, "error scanning tasks by user id")

			return nil, err
		}

		results = append(results, task)
	}

	return results, nil
}

func GetTasksByStatusFromDB(pool *pgx.Conn, status string) ([]models.Task, error) {
	task_status := strings.ToUpper(status)
	rows, err := pool.Query("SELECT task_id, group_id, created_by, created_date, task_status, task_type from task WHERE task_status = $1;", task_status)

	if err != nil {
		print(err, "error selecting tasks by status")

		return nil, err
	}

	defer rows.Close()

	var results []models.Task

	for rows.Next() {
		task := models.Task{}
		err := rows.Scan(&task.TaskID, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.TaskStatus, &task.TaskType)

		if err != nil {
			print(err, "error scanning tasks by status")

			return nil, err
		}

		results = append(results, task)
	}

	return results, nil
}

func GetTasksByTypeFromDB(pool *pgx.Conn, taskType string) ([]models.Task, error) {
	task_type := strings.ToLower(taskType)
	rows, err := pool.Query("SELECT task_id, group_id, created_by, created_date, task_status, task_type FROM task WHERE task_type = $1;", task_type)

	if err != nil {
		print(err, "error selecting tasks by type")

		return nil, err
	}

	defer rows.Close()

	var results []models.Task

	for rows.Next() {
		task := models.Task{}
		err := rows.Scan(&task.TaskID, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.TaskStatus, &task.TaskType)

		if err != nil {
			print(err, "error scanning tasks by type")

			return nil, err
		}

		results = append(results, task)
	}

	return results, nil
}

func GetTasksByStartDateFromDB(pool *pgx.Conn, startDate string) ([]models.Task, error) {
	rows, err := pool.Query("SELECT task_id, group_id, created_by, created_date, task_status, task_type FROM task WHERE start_date = $1;", startDate)

	if err != nil {
		print(err, "error selecting tasks by start date")

		return nil, err
	}

	defer rows.Close()

	var results []models.Task

	for rows.Next() {
		task := models.Task{}
		err := rows.Scan(&task.TaskID, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.TaskStatus, &task.TaskType)

		if err != nil {
			print(err, "error scanning tasks by start date")

			return nil, err
		}

		results = append(results, task)
	}

	return results, nil
}

func GetTasksByEndDateFromDB(pool *pgx.Conn, endDate string) ([]models.Task, error) {
	rows, err := pool.Query("SELECT task_id, group_id, created_by, created_date, task_status, task_type FROM task WHERE end_date = $1;", endDate)

	if err != nil {
		print(err, "error selecting tasks by end date")

		return nil, err
	}

	defer rows.Close()

	var results []models.Task

	for rows.Next() {
		task := models.Task{}
		err := rows.Scan(&task.TaskID, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.TaskStatus, &task.TaskType)

		if err != nil {
			print(err, "error scanning tasks by end date")

			return nil, err
		}

		results = append(results, task)
	}

	return results, nil
}
