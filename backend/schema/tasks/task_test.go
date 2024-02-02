package tasks

import (
	"bytes"
	"carewallet/configuration"
	"carewallet/db"
	"carewallet/models"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"reflect"
	"testing"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func TestTaskGroup(t *testing.T) {
	config, err := configuration.GetConfiguration()

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to retreive configuration file: %v\n", err)
		os.Exit(1)
	}

	conn := db.ConnectPosgresDatabase(config)
	defer conn.Close()

	controller := PgModel{Conn: conn}
	router := gin.Default()
	router.Use(cors.Default())

	v1 := router.Group("/")
	{
		TaskGroup(v1, &controller)
	}

	t.Run("TestGetTasksByGroupId", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/group/4", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by group id.")
		}

		var responseTasks []models.Task
		err := json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		createdDate, _ := time.Parse("2006-01-02 15:04:05", "2006-01-02 15:04:05")
		expectedTasks := []models.Task{
			{
				TaskID:      4,
				GroupID:     4,
				CreatedBy:   "user1",
				CreatedDate: createdDate,
				TaskStatus:  "COMPLETE",
				TaskType:    "other",
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestGetTasksByCreatedBy", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/created_by/user2", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by user id.")
		}

		var responseTasks []models.Task
		err := json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		createdDate, _ := time.Parse("2006-01-02 15:04:05", "2024-02-03 10:45:00")
		expectedTasks := []models.Task{
			{
				TaskID:      1,
				GroupID:     1,
				CreatedBy:   "user2",
				CreatedDate: createdDate,
				TaskStatus:  "INCOMPLETE",
				TaskType:    "med_mgmt",
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestGetTasksByStatus", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/status/COMPLETE", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by status.")
		}

		var responseTasks []models.Task
		err := json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		createdDate, _ := time.Parse("2006-01-02 15:04:05", "2006-01-02 15:04:05")
		expectedTasks := []models.Task{
			{
				TaskID:      4,
				GroupID:     4,
				CreatedBy:   "user1",
				CreatedDate: createdDate,
				TaskStatus:  "COMPLETE",
				TaskType:    "other",
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestGetTasksByType", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/type/other", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by start date.")
		}

		var responseTasks []models.Task
		err := json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		createdDate1, _ := time.Parse("2006-01-02 15:04:05", "2024-02-20 23:59:59")
		createdDate2, _ := time.Parse("2006-01-02 15:04:05", "2006-01-02 15:04:05")
		expectedTasks := []models.Task{
			{
				TaskID:      2,
				GroupID:     2,
				CreatedBy:   "user3",
				CreatedDate: createdDate1,
				TaskStatus:  "INCOMPLETE",
				TaskType:    "other",
			},
			{
				TaskID:      4,
				GroupID:     4,
				CreatedBy:   "user1",
				CreatedDate: createdDate2,
				TaskStatus:  "COMPLETE",
				TaskType:    "other",
			},
		}

		fmt.Println(
			"responseTasks: ", responseTasks,
		)
		fmt.Println(
			"expectedTasks: ", expectedTasks,
		)

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestGetTasksByStartDate", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/start/2024-02-05 10:00:00", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by start date.")
		}

		var responseTasks []models.Task
		err := json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		createdDate, _ := time.Parse("2006-01-02 15:04:05", "2024-02-03 10:45:00")
		expectedTasks := []models.Task{
			{
				TaskID:      1,
				GroupID:     1,
				CreatedBy:   "user2",
				CreatedDate: createdDate,
				TaskStatus:  "INCOMPLETE",
				TaskType:    "med_mgmt",
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestGetTasksByEndDate", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/end/2024-02-05 11:00:00", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by end date.")
		}

		var responseTasks []models.Task
		err := json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		createdDate, _ := time.Parse("2006-01-02 15:04:05", "2024-02-03 10:45:00")
		expectedTasks := []models.Task{
			{
				TaskID:      1,
				GroupID:     1,
				CreatedBy:   "user2",
				CreatedDate: createdDate,
				TaskStatus:  "INCOMPLETE",
				TaskType:    "med_mgmt",
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestAssignUsersToTask", func(t *testing.T) {
		type AssignRequest struct {
			UserIDs  []string `json:"userIDs"`
			Assigner string   `json:"assigner"`
		}

		assignRequest := AssignRequest{
			UserIDs:  []string{"user3", "user4"},
			Assigner: "user3",
		}

		userIdsJSON, err := json.Marshal(assignRequest)
		if err != nil {
			t.Error("Failed to marshal userIds to JSON")
		}

		fmt.Println("userIdsJSON: ", string(userIdsJSON))

		// Create a request with the userIds JSON
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/tasks/1/assignees", bytes.NewBuffer(userIdsJSON))
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to assign users to task.")
		}

		var responseTaskUsers []models.TaskUser
		err = json.Unmarshal(w.Body.Bytes(), &responseTaskUsers)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedTaskUsers := []models.TaskUser{
			{
				TaskID: 1,
				UserID: "user3",
			},
			{
				TaskID: 1,
				UserID: "user4",
			},
		}

		fmt.Println("responseTaskUsers: ", responseTaskUsers)
		fmt.Println("expectedTaskUsers: ", expectedTaskUsers)

		if !reflect.DeepEqual(expectedTaskUsers, responseTaskUsers) {
			t.Error("Result was not correct")
		}
	})
}
