package tasks

import (
	"carewallet/models"
	"fmt"
	"strconv"
	"time"

	"github.com/jackc/pgx"
)

func GetTasksByQueryFromDB(pool *pgx.Conn, filterQuery TaskQuery) ([]models.Task, error) {
	query_fields := []string{
		filterQuery.TaskID,
		filterQuery.GroupID,
		filterQuery.CreatedBy,
		filterQuery.TaskStatus,
		filterQuery.TaskType,
		filterQuery.StartDate,
		filterQuery.EndDate}

	field_names := []string{"task_id =", "group_id =", "created_by =", "task_status =", "task_type =", "start_date >=", "end_date <="}
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

	rows, err := pool.Query("SELECT task_id, group_id, created_by, created_date, start_date, end_date, task_status, task_type FROM task WHERE "+query, args...)

	if err != nil {
		print(err, "error selecting tasks by query")
		return nil, err
	}

	defer rows.Close()

	var results []models.Task

	for rows.Next() {
		task := models.Task{}
		err := rows.Scan(&task.TaskID, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.StartDate, &task.EndDate, &task.TaskStatus, &task.TaskType)

		if err != nil {
			print(err, "error scanning tasks by query")
			return nil, err
		}

		results = append(results, task)
	}

	return results, nil
}

func AssignUsersToTaskInDB(pool *pgx.Conn, users []string, taskID string, assigner string) ([]models.TaskUser, error) {
	task_id, err := strconv.Atoi(taskID)
	if err != nil {
		return nil, err
	}

	var assignedUsers []models.TaskUser

	for _, user := range users {
		_, err := pool.Exec("INSERT INTO task_assignees (task_id, user_id, assignment_status, assigned_by, assigned_date) VALUES ($1, $2, $3, $4, $5);", task_id, user, "NOTIFIED", assigner, time.Now())

		if err != nil {
			print(err.Error(), "error inserting users into task_assignees")
			return nil, err
		}

		assignedUsers = append(assignedUsers, models.TaskUser{TaskID: task_id, UserID: user})
	}

	return assignedUsers, nil
}

func RemoveUsersFromTaskInDB(pool *pgx.Conn, users []string, taskID string) ([]models.TaskUser, error) {
	task_id, err := strconv.Atoi(taskID)
	if err != nil {
		print(err, "error converting task ID to int")
		return nil, err
	}

	var removedUsers []models.TaskUser

	for _, user := range users {
		var exists int
		err := pool.QueryRow("SELECT 1 FROM task_assignees WHERE task_id = $1 AND user_id = $2 LIMIT 1;", task_id, user).Scan(&exists)
		if err != nil {
			if err == pgx.ErrNoRows {
				return nil, fmt.Errorf("user not assigned to task")
			}
			print(err, "error checking if user and task exist in task_assignees")
			return nil, err
		}

		_, err = pool.Exec("DELETE FROM task_assignees WHERE task_id = $1 AND user_id = $2;", task_id, user)
		if err != nil {
			print(err, "error deleting users from task_assignees")
			return nil, err
		}

		removedUsers = append(removedUsers, models.TaskUser{TaskID: task_id, UserID: user})
	}

	return removedUsers, nil
}

func GetTasksByAssignedFromDB(pool *pgx.Conn, userIDs []string) ([]models.Task, error) {
	var task_ids []int
	var tasks []models.Task

	// Get all task IDs assigned to the user
	for _, userID := range userIDs {
		fmt.Println(userID)
		taskIDs, err := pool.Query("SELECT task_id FROM task_assignees WHERE user_id = $1;", userID)
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
			fmt.Println(task_id)
			task_ids = append(task_ids, task_id)
		}
	}

	// Get all tasks by task ID
	var task models.Task
	for _, task_id := range task_ids {
		err := pool.QueryRow("SELECT * FROM task WHERE task_id = $1;", task_id).Scan(&task.TaskID, &task.GroupID, &task.CreatedBy, &task.CreatedDate, &task.StartDate, &task.EndDate, &task.Notes, &task.Repeating, &task.RepeatingInterval, &task.RepeatingEndDate, &task.TaskStatus, &task.TaskType, &task.TaskInfo)
		if err != nil {
			print(err, "error querying task by ID")
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return tasks, nil
}
