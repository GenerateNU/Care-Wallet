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
			TaskTitle:  "",
			GroupID:    "",
			CreatedBy:  "",
			TaskStatus: "",
			TaskType:   "other",
			StartDate:  "",
			EndDate:    "",
			QuickTask:  "",
		}

		w := httptest.NewRecorder()
		query := url.Values{}
		query.Set("groupID", getRequest.GroupID)
		query.Set("createdBy", getRequest.CreatedBy)
		query.Set("taskStatus", getRequest.TaskStatus)
		query.Set("taskType", getRequest.TaskType)
		query.Set("startDate", getRequest.StartDate)
		query.Set("endDate", getRequest.EndDate)
		query.Set("quickTask", getRequest.QuickTask)

		req, _ := http.NewRequest("GET", "/tasks/filtered?"+query.Encode(), nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve tasks by filter query.")
			return
		}

		var responseTasks []models.Task
		err = json.Unmarshal(w.Body.Bytes(), &responseTasks)

		if err != nil {
			t.Error("Failed to unmarshal json")
			return
		}
		start_date_1 := time.Date(2024, 2, 10, 14, 30, 0, 0, time.UTC)
		notes_1 := "Schedule doctor appointment"
		notes_2 := "Refill water pitcher"

		expectedTasks := []models.Task{
			{
				TaskID:            2,
				TaskTitle:         "task 2",
				GroupID:           2,
				CreatedBy:         "user3",
				CreatedDate:       time.Date(2024, 2, 20, 23, 59, 59, 0, time.UTC),
				StartDate:         &start_date_1,
				EndDate:           &start_date_1,
				QuickTask:         false,
				Notes:             &notes_1,
				Repeating:         false,
				RepeatingInterval: nil,
				RepeatingEndDate:  nil,
				TaskStatus:        "OVERDUE",
				TaskType:          "other",
				TaskInfo:          nil,
			},
			{
				TaskID:            4,
				TaskTitle:         "task 4",
				GroupID:           4,
				CreatedBy:         "user1",
				CreatedDate:       time.Date(2006, 1, 2, 15, 4, 5, 0, time.UTC),
				StartDate:         &start_date_1,
				EndDate:           &start_date_1,
				Repeating:         false,
				RepeatingInterval: nil,
				RepeatingEndDate:  nil,
				QuickTask:         true,
				Notes:             &notes_2,
				TaskStatus:        "COMPLETE",
				TaskType:          "other",
				TaskInfo:          nil,
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct", responseTasks, "Expected", expectedTasks)
			return
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
		start_date_1 := time.Date(2024, 2, 10, 14, 30, 0, 0, time.UTC)
		expectedTasks := []models.Task{
			{
				TaskID:            4,
				TaskTitle:         "task 4",
				GroupID:           4,
				CreatedBy:         "user1",
				CreatedDate:       time.Date(2006, 1, 2, 15, 4, 5, 0, time.UTC),
				StartDate:         &start_date_1,
				EndDate:           &start_date_1,
				QuickTask:         true,
				Notes:             &note,
				Repeating:         false,
				RepeatingInterval: nil,
				RepeatingEndDate:  nil,
				TaskStatus:        "COMPLETE",
				TaskType:          "other",
				TaskInfo:          nil,
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
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
		start_date_1 := time.Date(2024, 2, 10, 14, 30, 0, 0, time.UTC)
		expectedTasks := []models.Task{
			{
				TaskID:            4,
				TaskTitle:         "task 4",
				GroupID:           4,
				CreatedBy:         "user1",
				CreatedDate:       time.Date(2006, 1, 2, 15, 4, 5, 0, time.UTC),
				StartDate:         &start_date_1,
				EndDate:           &start_date_1,
				Notes:             &note,
				Repeating:         false,
				RepeatingInterval: nil,
				RepeatingEndDate:  nil,
				TaskStatus:        "COMPLETE",
				TaskType:          "other",
				QuickTask:         true,
				TaskInfo:          nil,
			},
		}

		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestCreateTask_Success", func(t *testing.T) {
		// Creating a Task instance
		startDate := time.Now().UTC()
		endDate := time.Now().Add(24 * time.Hour).UTC()
		notes := "This is a sample task"
		repeating := true
		repeatingInterval := "Weekly"
		repeatingEndDate := time.Now().Add(7 * 24 * time.Hour).UTC()
		taskInfo := `{"info": "Additional information about the task"}`

		taskData := models.Task{
			TaskID:            1,
			GroupID:           1,
			CreatedBy:         "user1",
			StartDate:         &startDate,
			EndDate:           &endDate,
			Notes:             &notes,
			QuickTask:         false,
			Repeating:         repeating,
			RepeatingInterval: &repeatingInterval,
			RepeatingEndDate:  &repeatingEndDate,
			TaskStatus:        "INCOMPLETE",
			TaskType:          "med_mgmt",
			TaskInfo:          &taskInfo,
		}

		taskJSON, err := json.Marshal(taskData)
		if err != nil {
			t.Error("Failed to marshal task data to JSON:", err)
		}

		// Create a new request with the task data
		req, err := http.NewRequest("POST", "/tasks", bytes.NewBuffer(taskJSON))
		if err != nil {
			t.Error("Failed to create HTTP request:", err)
		}

		// Create a recorder to capture the response
		w := httptest.NewRecorder()

		// Serve the request using the router
		router.ServeHTTP(w, req)

		// Assertions
		if http.StatusCreated != w.Code {
			t.Error("Expected status 201, got", w.Code)
		}

		// Validate the response body
		var createdTask models.Task
		err = json.Unmarshal(w.Body.Bytes(), &createdTask)
		if err != nil {
			t.Error("Failed to unmarshal JSON:", err)
		}

		// Add more specific assertions based on the expected response
		if createdTask.TaskID == -1 {
			t.Error("Expected task ID to be present")
		}
		if createdTask.CreatedBy != "user1" {
			t.Error("Unexpected created_by value")
		}
		// Add more assertions as needed
	})

	t.Run("TestDeleteTask", func(t *testing.T) {
		// Perform a DELETE request to the /tasks/:tid endpoint
		req, err := http.NewRequest("DELETE", "/tasks/5", nil)
		if err != nil {
			t.Fatal("Failed to create HTTP request:", err)
		}

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		// Assertions
		if http.StatusNoContent != w.Code {
			t.Fatal("Expected status 204, got", w.Code)
		}

		if body := w.Body.String(); body != "" {
			t.Fatal("Expected empty response body, got", body)
		}
	})

	t.Run("TestUpdateTaskInfo", func(t *testing.T) {
		// Creating a Task instance
		startDate := time.Now().UTC()
		endDate := time.Now().Add(24 * time.Hour).UTC()
		notes := "This is a sample task"
		repeating := true
		repeatingInterval := "Weekly"
		repeatingEndDate := time.Now().Add(7 * 24 * time.Hour).UTC()
		taskInfo := `{"info": "Additional information about the task"}`

		taskData := models.Task{
			TaskID:            1,
			GroupID:           1,
			CreatedBy:         "user1",
			CreatedDate:       time.Now().UTC(),
			StartDate:         &startDate,
			EndDate:           &endDate,
			Notes:             &notes,
			Repeating:         repeating,
			RepeatingInterval: &repeatingInterval,
			RepeatingEndDate:  &repeatingEndDate,
			TaskStatus:        "INCOMPLETE",
			TaskType:          "med_mgmt",
			TaskInfo:          &taskInfo,
		}
		requestBodyJSON, err := json.Marshal(taskData)
		if err != nil {
			t.Fatal("Failed to marshal task data to JSON:", err)
			return
		}

		// Perform a PUT request to the /tasks/:tid/info endpoint
		req, err := http.NewRequest("PUT", "/tasks/1", bytes.NewBuffer(requestBodyJSON))
		if err != nil {
			t.Fatal("Failed to create HTTP request:", err)
			return
		}

		// Create a recorder to capture the response
		w := httptest.NewRecorder()

		// Serve the request using the router
		router.ServeHTTP(w, req)

		// Assertions
		if http.StatusOK != w.Code {
			t.Fatal("Expected status 200, got", w.Code)
			return
		}
	})

	t.Run("TestGetUsersAssignedToTask", func(t *testing.T) {
		// Create a new recorder and request
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/2/assigned", nil)

		// Serve the request using the router
		router.ServeHTTP(w, req)

		// Print the response body for debugging
		fmt.Println("Response Body:", w.Body.String())

		// Assertions
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve users assigned to task.")
		}

		var responseUsers []string
		err := json.Unmarshal(w.Body.Bytes(), &responseUsers)
		if err != nil {
			t.Error("Failed to unmarshal JSON")
		}

		expectedUsers := []string{"user3", "user4"}
		if !reflect.DeepEqual(expectedUsers, responseUsers) {
			t.Error("Result was not correct")
		}
	})
}
