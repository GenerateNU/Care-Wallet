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

	v1 := router.Group("/")
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
		query.Set("GroupID", getRequest.GroupID)
		query.Set("CreatedBy", getRequest.CreatedBy)
		query.Set("TaskStatus", getRequest.TaskStatus)
		query.Set("TaskType", getRequest.TaskType)
		query.Set("StartDate", getRequest.StartDate)
		query.Set("EndDate", getRequest.EndDate)

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

		expectedTasks := []models.Task{
			{
				TaskID:      2,
				GroupID:     2,
				CreatedBy:   "user3",
				CreatedDate: time.Date(2024, 2, 20, 23, 59, 59, 0, time.UTC),
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

		fmt.Println(expectedTasks)
		fmt.Println(responseTasks)
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
			UserIDs:  []string{"user3"},
			Assigner: "user3",
		}

		userIdsJSON, err := json.Marshal(assignRequest)
		if err != nil {
			t.Error("Failed to marshal userIds to JSON")
		}

		// Create a request with the userIds JSON
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/tasks/4/assign", bytes.NewBuffer(userIdsJSON))
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
				TaskID: 4,
				UserID: "user3",
			},
		}

		fmt.Println("responseTaskUsers: ", responseTaskUsers)
		fmt.Println("expectedTaskUsers: ", expectedTaskUsers)

		if !reflect.DeepEqual(expectedTaskUsers, responseTaskUsers) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestRemoveUsersFromTask", func(t *testing.T) {
		type RemoveRequest struct {
			UserIDs []string `json:"userIDs"`
		}

		removeRequest := RemoveRequest{
			UserIDs: []string{"user2"},
		}

		userIdsJSON, err := json.Marshal(removeRequest)
		if err != nil {
			t.Error("Failed to marshal userIds to JSON")
		}

		// Create a request with the userIds JSON
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("DELETE", "/tasks/4/remove", bytes.NewBuffer(userIdsJSON))
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to remove users from task.")
		}

		var responseTaskUsers []models.TaskUser
		err = json.Unmarshal(w.Body.Bytes(), &responseTaskUsers)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedTaskUsers := []models.TaskUser{
			{
				TaskID: 4,
				UserID: "user2",
			},
		}

		if !reflect.DeepEqual(expectedTaskUsers, responseTaskUsers) {
			t.Error("Result was not correct")
		}
	})

}
