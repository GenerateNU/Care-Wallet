package tasks

import (
	"carewallet/models"
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GetTasksByQueryFromDB(pool *pgxpool.Pool, filterQuery TaskQuery) ([]models.Task, error) {
	query_fields := []string{
		filterQuery.TaskID,
		filterQuery.TaskTitle,
		filterQuery.GroupID,
		filterQuery.CreatedBy,
		filterQuery.TaskStatus,
		filterQuery.TaskType,
		filterQuery.StartDate,
		filterQuery.EndDate,
		filterQuery.QuickTask}

	field_names := []string{"task_id =", "task_title =", "group_id =", "created_by =", "task_status =", "task_type =", "start_date >=", "end_date <=", "quick_task ="}
	var query string
	var args []interface{}

	for i, field := range query_fields {
		if field != "" {
			if query != "" {
				query += " AND "
			}
			query += fmt.Sprintf("%s $%d", field_names[i], len(args)+1)
			args = append(args, field)
		}
	}

	queryString := "SELECT * FROM task WHERE " + query

	rows, err := pool.Query(context.Background(), queryString, args...)

	if err != nil {
		print(err.Error(), "error selecting tasks by query")
		return nil, err
	}

	defer rows.Close()

	var results []models.Task

	for rows.Next() {
		task := models.Task{}
		err := rows.Scan(&task.TaskID, &task.TaskTitle, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.StartDate, &task.EndDate, &task.QuickTask, &task.Notes, &task.Repeating, &task.RepeatingInterval, &task.RepeatingEndDate, &task.TaskStatus, &task.TaskType, &task.TaskInfo)

		if err != nil {
			print(err.Error(), "error scanning tasks by query")
			return nil, err
		}

		results = append(results, task)
	}

	return results, nil
}

func AssignUsersToTaskInDB(pool *pgxpool.Pool, users []string, taskID string, assigner string) ([]models.TaskUser, error) {
	task_id, err := strconv.Atoi(taskID)
	if err != nil {
		return nil, err
	}

	var assignedUsers []models.TaskUser

	for _, user := range users {
		_, err := pool.Exec(context.Background(), "INSERT INTO task_assignees (task_id, user_id, assignment_status, assigned_by, assigned_date) VALUES ($1, $2, $3, $4, $5);", task_id, user, "NOTIFIED", assigner, time.Now())

		if err != nil {
			print(err.Error(), "error inserting users into task_assignees")
			return nil, err
		}

		assignedUsers = append(assignedUsers, models.TaskUser{TaskID: task_id, UserID: user})
	}

	return assignedUsers, nil
}

func RemoveUsersFromTaskInDB(pool *pgxpool.Pool, users []string, taskID string) ([]models.TaskUser, error) {
	task_id, err := strconv.Atoi(taskID)
	if err != nil {
		print(err, "error converting task ID to int")
		return nil, err
	}

	var removedUsers []models.TaskUser

	for _, user := range users {
		var exists int
		err := pool.QueryRow(context.Background(), "SELECT 1 FROM task_assignees WHERE task_id = $1 AND user_id = $2 LIMIT 1;", task_id, user).Scan(&exists)
		if err != nil {
			if err == pgx.ErrNoRows {
				return nil, fmt.Errorf("user not assigned to task")
			}
			print(err, "error checking if user and task exist in task_assignees")
			return nil, err
		}

		_, err = pool.Exec(context.Background(), "DELETE FROM task_assignees WHERE task_id = $1 AND user_id = $2;", task_id, user)
		if err != nil {
			print(err, "error deleting users from task_assignees")
			return nil, err
		}

		removedUsers = append(removedUsers, models.TaskUser{TaskID: task_id, UserID: user})
	}

	return removedUsers, nil
}

func GetTasksByAssignedFromDB(pool *pgxpool.Pool, userIDs []string) ([]models.Task, error) {
	var task_ids []int
	var tasks []models.Task

	// Get all task IDs assigned to the user
	for _, userID := range userIDs {
		fmt.Println(userID)
		taskIDs, err := pool.Query(context.Background(), "SELECT task_id FROM task_assignees WHERE user_id = $1;", userID)
		if err != nil {
			print(err, "error selecting task assignees")
			return nil, err
		}
		defer taskIDs.Close()

		for taskIDs.Next() {
			var task_id int

			err := taskIDs.Scan(&task_id)
			if err != nil {
				print(err, "error scanning task ID")
				return nil, err
			}
			task_ids = append(task_ids, task_id)
		}
	}

	// Get all tasks by task ID
	var task models.Task
	for _, task_id := range task_ids {
		err := pool.QueryRow(context.Background(), "SELECT * FROM task WHERE task_id = $1;", task_id).Scan(&task.TaskID, &task.TaskTitle, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.StartDate, &task.EndDate, &task.QuickTask, &task.Notes, &task.Repeating, &task.RepeatingInterval, &task.RepeatingEndDate, &task.TaskStatus, &task.TaskType, &task.TaskInfo)
		if err != nil {
			print(err, "error querying task by ID")
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return tasks, nil
}

// CreateTaskInDB creates a new task in the database and returns its ID
func CreateTaskInDB(pool *pgxpool.Pool, newTask models.Task) (int, error) {
	query := `
        INSERT INTO task (group_id, created_by, created_date, start_date, end_date, quick_task, notes, repeating, repeating_interval, repeating_end_date, task_status, task_type, task_info, task_title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING task_id`

	var newTaskID int
	err := pool.QueryRow(context.Background(),
		query,
		newTask.GroupID,
		newTask.CreatedBy,
		time.Now(), // Assuming created_date should be the current timestamp
		newTask.StartDate,
		newTask.EndDate,
		newTask.QuickTask,
		newTask.Notes,
		newTask.Repeating,
		newTask.RepeatingInterval,
		newTask.RepeatingEndDate,
		newTask.TaskStatus,
		newTask.TaskType,
		newTask.TaskInfo,
		newTask.TaskTitle,
	).Scan(&newTaskID)

	return newTaskID, err
}

// DeleteTaskInDB deletes a task from the database by ID
func DeleteTaskInDB(pool *pgxpool.Pool, taskID int) error {
	// Assuming "task" table structure, adjust the query based on your schema
	query := "DELETE FROM task WHERE task_id = $1"

	_, err := pool.Exec(context.Background(), query, taskID)
	return err
}

// UpdateTaskInfoInDB updates the task_info field in the database
func UpdateTaskInfoInDB(pool *pgxpool.Pool, taskID int, taskInfo json.RawMessage) error {
	// Assuming "task" table structure, adjust the query based on your schema
	query := "UPDATE task SET task_info = $1 WHERE task_id = $2"

	_, err := pool.Exec(context.Background(), query, taskInfo, taskID)
	return err
}

// GetTaskByID fetches a task from the database by its ID
func GetTaskByID(pool *pgxpool.Pool, taskID int) (models.Task, error) {
	query := `SELECT * FROM task WHERE task_id = $1`

	var task models.Task
	err := pool.QueryRow(context.Background(), query, taskID).Scan(
		&task.TaskID,
		&task.TaskTitle,
		&task.GroupID,
		&task.CreatedBy,
		&task.CreatedDate,
		&task.StartDate,
		&task.EndDate,
		&task.QuickTask,
		&task.Notes,
		&task.Repeating,
		&task.RepeatingInterval,
		&task.RepeatingEndDate,
		&task.TaskStatus,
		&task.TaskType,
		&task.TaskInfo,
	)
	return task, err
}

func GetUsersAssignedToTaskFromDB(pool *pgxpool.Pool, taskID int) ([]string, error) {
	var userIDs []string

	// Get all user IDs assigned to the task
	rows, err := pool.Query(context.Background(), "SELECT user_id FROM task_assignees WHERE task_id = $1;", taskID)
	if err != nil {
		fmt.Println(err, "error selecting user assignees")
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var userID string

		err := rows.Scan(&userID)
		if err != nil {
			fmt.Println(err, "error scanning user ID")
			return nil, err
		}

		fmt.Println(userID)
		userIDs = append(userIDs, userID)
	}

	return userIDs, nil
}
