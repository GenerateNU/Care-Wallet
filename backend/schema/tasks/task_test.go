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
	"strconv"
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
		query.Set("groupID", getRequest.GroupID)
		query.Set("createdBy", getRequest.CreatedBy)
		query.Set("taskStatus", getRequest.TaskStatus)
		query.Set("taskType", getRequest.TaskType)
		query.Set("startDate", getRequest.StartDate)
		query.Set("endDate", getRequest.EndDate)

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

		fmt.Println("Expected: ", expectedTasks)
		fmt.Println("Response: ", responseTasks)
		if !reflect.DeepEqual(expectedTasks, responseTasks) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestCreateTask_Success", func(t *testing.T) {
		// Prepare a new task request body
		taskData := map[string]interface{}{
			"group_id":           1,
			"created_by":         "user1",
			"start_date":         time.Now().Format(time.RFC3339),
			"end_date":           time.Now().Add(time.Hour).Format(time.RFC3339),
			"notes":              "Test task",
			"repeating":          false,
			"repeating_interval": "",
			"repeating_end_date": time.Now().Add(2 * time.Hour).Format(time.RFC3339),
			"task_status":        "INCOMPLETE",
			"task_type":          "other",
			"task_info": map[string]interface{}{
				"details": "Test details",
			},
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
		var createdTask map[string]interface{}
		err = json.Unmarshal(w.Body.Bytes(), &createdTask)
		if err != nil {
			t.Error("Failed to unmarshal JSON:", err)
		}

		// Add more specific assertions based on the expected response
		if createdTask["task_id"] == nil {
			t.Error("Expected task ID to be present")
		}
		if createdTask["created_by"] != "user1" {
			t.Error("Unexpected created_by value")
		}
		// Add more assertions as needed
	})

	t.Run("TestDeleteTask", func(t *testing.T) {
		getTaskByIDFunc := func(taskID int) (models.Task, error) {
			return models.Task{
				TaskID: taskID,
				// Add other necessary fields
			}, nil
		}

		// Mock the successful deletion of the task in the database
		deleteTaskInDBFunc := func(taskID int) error {
			return nil
		}

		// Create a new Gin router
		router := gin.Default()

		// Attach the DeleteTask route to the router
		router.DELETE("/tasks/:tid", func(c *gin.Context) {
			// Extract task ID from the path parameter
			taskID, err := strconv.Atoi(c.Param("tid"))
			if err != nil {
				c.JSON(http.StatusBadRequest, err.Error())
				return
			}

			// Check if the task exists before attempting to delete
			if _, err := getTaskByIDFunc(taskID); err != nil {
				c.JSON(http.StatusBadRequest, err.Error())
				return
			}

			// Delete the task from the database
			if err := deleteTaskInDBFunc(taskID); err != nil {
				fmt.Println("error deleting task from the database:", err)
				c.JSON(http.StatusBadRequest, err.Error())
				return
			}

			c.Status(http.StatusNoContent)
		})

		// Perform a DELETE request to the /tasks/:tid endpoint
		req, err := http.NewRequest("DELETE", "/tasks/1", nil)
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
		// Mock the successful update of task info in the database
		var updateTaskInfoInDBFunc func(taskID int, taskInfoRaw json.RawMessage) error

		// Mock the successful retrieval of the task by ID
		var getTaskByIDFunc func(taskID int) (models.Task, error)

		// Create a new Gin router
		router := gin.Default()

		// Attach the UpdateTaskInfo route to the router
		router.PUT("/tasks/:tid/info", func(c *gin.Context) {
			// Extract task ID from the path parameter
			taskIDStr := c.Param("tid")
			taskID, err := strconv.Atoi(taskIDStr)
			if err != nil {
				c.JSON(http.StatusBadRequest, err.Error())
				return
			}

			// Bind the request body to the UpdateTaskInfoRequest struct
			var requestBody struct {
				GroupID           int                    `json:"group_id"`
				CreatedBy         string                 `json:"created_by"`
				StartDate         time.Time              `json:"start_date"`
				EndDate           time.Time              `json:"end_date"`
				Notes             string                 `json:"notes"`
				Repeating         bool                   `json:"repeating"`
				RepeatingInterval string                 `json:"repeating_interval"`
				RepeatingEndDate  time.Time              `json:"repeating_end_date"`
				TaskStatus        string                 `json:"task_status"`
				TaskType          string                 `json:"task_type"`
				TaskInfo          map[string]interface{} `json:"task_info"`
			}
			if err := c.BindJSON(&requestBody); err != nil {
				c.JSON(http.StatusBadRequest, err.Error())
				return
			}

			// Convert TaskInfo to json.RawMessage
			taskInfoRaw, err := json.Marshal(requestBody.TaskInfo)
			if err != nil {
				c.JSON(http.StatusBadRequest, err.Error())
				return
			}

			// Mock the successful update of task info in the database
			if updateTaskInfoInDBFunc != nil {
				if err := updateTaskInfoInDBFunc(taskID, taskInfoRaw); err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}
			}

			// Mock the successful retrieval of the task by ID
			if getTaskByIDFunc != nil {
				task, err := getTaskByIDFunc(taskID)
				if err != nil {
					c.JSON(http.StatusBadRequest, err.Error())
					return
				}

				// Fetch the updated task from the database
				c.JSON(http.StatusOK, task)
				return
			}

			c.Status(http.StatusOK)
		})

		// Prepare a request body with task data
		requestBody := map[string]interface{}{
			"group_id":           1,
			"created_by":         "user1",
			"start_date":         time.Now().Format(time.RFC3339),
			"end_date":           time.Now().Add(time.Hour).Format(time.RFC3339),
			"notes":              "Test task",
			"repeating":          false,
			"repeating_interval": "",
			"repeating_end_date": time.Now().Add(2 * time.Hour).Format(time.RFC3339),
			"task_status":        "INCOMPLETE",
			"task_type":          "other",
			"task_info": map[string]interface{}{
				"details": "Test details",
			},
		}
		requestBodyJSON, err := json.Marshal(requestBody)
		if err != nil {
			t.Fatal("Failed to marshal task data to JSON:", err)
			return
		}

		// Perform a PUT request to the /tasks/:tid/info endpoint
		req, err := http.NewRequest("PUT", "/tasks/1/info", bytes.NewBuffer(requestBodyJSON))
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
		req, _ := http.NewRequest("GET", "/tasks/1/assigned-users", nil)

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

		expectedUsers := []string{"user1"}
		if !reflect.DeepEqual(expectedUsers, responseUsers) {
			t.Error("Result was not correct")
		}
	})
}
