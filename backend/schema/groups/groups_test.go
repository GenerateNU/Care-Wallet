package groups

import (
	"bytes"
	"carewallet/configuration"
	"carewallet/db"
	"carewallet/models"
	"fmt"
	"os"
	"testing"
	"time"

	"encoding/json"
	"net/http"
	"net/http/httptest"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func TestGroupRoutes(t *testing.T) {
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

	v1 := router.Group("/group")
	{
		CareGroups(v1, &controller)
	}

	// test to get group members
	t.Run("TestGetGroupMembers", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/group/1", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve group members.")
		}

		var response models.CareGroup

		if err := json.Unmarshal(w.Body.Bytes(), &response); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
		}

		// Define the expected
		expected := models.CareGroup{
			GroupID: 1, GroupName: "Sample Care Group",
			DateCreated: time.Now(),
		}

		if response.GroupID != expected.GroupID && response.GroupName != expected.GroupName {
			t.Error("Result was not correct")
			t.Errorf("Expected users: %v, Actual users: %v", expected, response)
		}
	})

	// test to create a group
	t.Run("TestCreateGroup", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/group/create/testgroup", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to create group.")
		}

		var responseGroupID int

		if err := json.Unmarshal(w.Body.Bytes(), &responseGroupID); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
		}

		// Define the expected users
		expectedGroupID := 6

		if expectedGroupID != responseGroupID {
			t.Error("Result was not correct")
			t.Errorf("Expected groupID: %d, Actual groupID: %d", expectedGroupID, responseGroupID)
		}
	})

	// test to add a user to a group
	t.Run("TestAddUser", func(t *testing.T) {
		postRequest := GroupMember{
			UserId: "user3",
			Role:   "PATIENT",
		}

		requestJSON, err := json.Marshal(postRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/group/3/add", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to add user.")
		}

		var responseGroupID int

		if err := json.Unmarshal(w.Body.Bytes(), &responseGroupID); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
		}

		// Define the expected users
		expectedGroupID := 3

		if expectedGroupID != responseGroupID {
			t.Error("Result was not correct")
			t.Errorf("Expected groupID: %d, Actual groupID: %d", expectedGroupID, responseGroupID)
		}
	})
}
