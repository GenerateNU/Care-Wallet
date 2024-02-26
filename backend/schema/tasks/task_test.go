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
	"net/url"
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

	v1 := router.Group("/tasks")
	{
		TaskGroup(v1, &controller)
	}

	t.Run("TestGetFilteredTasks", func(t *testing.T) {
		getRequest := TaskQuery{
			GroupID:    "",
			CreatedBy:  "",
			TaskStatus: "",
			TaskType:   "other",
			StartDate:  "",
			EndDate:    "",
		}

		w := httptest.NewRecorder()
		query := url.Values{}
		query.Add("groupID", getRequest.GroupID)
		query.Add("createdBy", getRequest.CreatedBy)
		query.Add("taskStatus", getRequest.TaskStatus)
		query.Add("taskType", getRequest.TaskType)
		query.Add("startDate", getRequest.StartDate)
		query.Add("endDate", getRequest.EndDate)

		req, _ := http.NewRequest("GET", "/tasks/filtered?"+query.Encode(), nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by filter query.")
		}

		var responseTasks []models.Task
		err = json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}
		start_date_1 := time.Date(2024, 2, 10, 14, 30, 0, 0, time.UTC)
		expectedTasks := []models.Task{
			{
				TaskID:      2,
				GroupID:     2,
				CreatedBy:   "user3",
				CreatedDate: time.Date(2024, 2, 20, 23, 59, 59, 0, time.UTC),
				StartDate:   &start_date_1,
				TaskStatus:  "INCOMPLETE",
				TaskType:    "other",
			},
			{
				TaskID:      4,
				GroupID:     4,
				CreatedBy:   "user1",
				CreatedDate: time.Date(2006, 1, 2, 15, 4, 5, 0, time.UTC),
				TaskStatus:  "COMPLETE",
				TaskType:    "other",
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestRemoveUsersFromTask", func(t *testing.T) {
		var removeRequest = Removal{
			UserIDs: []string{"user1"},
		}

		requestJSON, err := json.Marshal(removeRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("DELETE", "/tasks/1/remove", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to remove users from task.")
		}

		var removeResponse []models.TaskUser
		err = json.Unmarshal(w.Body.Bytes(), &removeResponse)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedTaskUsers := []models.TaskUser{
			{
				TaskID: 1,
				UserID: "user1",
			},
		}

		if !reflect.DeepEqual(expectedTaskUsers, removeResponse) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestAssignUsersToTask", func(t *testing.T) {
		assignRequest := Assignment{
			UserIDs:  []string{"user4"},
			Assigner: "user1",
		}

		requestJSON, err := json.Marshal(assignRequest)
		if err != nil {
			t.Error("Failed to marshal assign request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/tasks/2/assign", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to assign users to task.")
		}

		var assignResponse []models.TaskUser
		err = json.Unmarshal(w.Body.Bytes(), &assignResponse)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedTaskUsers := []models.TaskUser{
			{
				TaskID: 2,
				UserID: "user4",
			},
		}

		if !reflect.DeepEqual(expectedTaskUsers, assignResponse) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestGetTasksByAssigned", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/assigned?userIDs=user2", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by assigned user.")
		}

		var responseTasks []models.Task
		err = json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		note := "Refill water pitcher"
		expectedTasks := []models.Task{
			{
				TaskID:      4,
				GroupID:     4,
				CreatedBy:   "user1",
				CreatedDate: time.Date(2006, 1, 2, 15, 4, 5, 0, time.UTC),
				Notes:       &note,
				TaskStatus:  "COMPLETE",
				TaskType:    "other",
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})
}
