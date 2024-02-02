package tasks

import (
	"carewallet/models"
	"fmt"
	"strconv"
	"strings"
	"time"

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

func AssignUsersToTaskInDB(pool *pgx.Conn, users []string, taskID string, assigner string) ([]models.TaskUser, error) {
	task_id, err := strconv.Atoi(taskID)
	if err != nil {
		print(err, "error converting task ID to int")
		return nil, err
	}

	var taskUsers []models.TaskUser

	for _, user := range users {
		print(task_id, " ", user)
		_, err := pool.Exec("INSERT INTO task_assignees (task_id, user_id, assignment_status, assigned_by, assigned_date) VALUES ($1, $2, $3, $4, $5);", task_id, user, "NOTIFIED", assigner, time.Now())

		if err != nil {
			print(err, "error inserting users into task_user")

			return nil, err
		}

		taskUsers = append(taskUsers, models.TaskUser{TaskID: task_id, UserID: user})
		fmt.Println(taskUsers)
	}

	return taskUsers, nil
}
