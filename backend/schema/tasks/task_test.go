package tasks

import (
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

func TestGetTasks(t *testing.T) {
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

		createdDate, _ := time.Parse("2006-01-02 15:04:05", "2024-02-01 20:14:26.126136")
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

		createdDate, _ := time.Parse("2006-01-02 15:04:05", "2024-02-01 20:14:26.126136")
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

		fmt.Println("Expected:", expectedTasks)
		fmt.Println("Response: ", responseTasks)

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

		createdDate, _ := time.Parse("2006-01-02 15:04:05", "2024-02-01 20:14:26.126136")
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
}