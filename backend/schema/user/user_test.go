package user

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

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func TestUser(t *testing.T) {
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

	v1 := router.Group("")
	{
		UserGroup(v1, &controller)
	}

	t.Run("TestGetUser", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/user/user1", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve user.")
			return
		}

		var responseUser models.User

		// Unmarshal the response JSON
		if err := json.Unmarshal(w.Body.Bytes(), &responseUser); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
			return
		}

		// Define the expected user
		expectedUser := models.User{
			UserID:    "user1",
			Phone:     "123-456-7890",
			Address:   "123 Main St",
			FirstName: "John",
			LastName:  "Smith",
			Email:     "john.smith@example.com",
		}

		if expectedUser != responseUser {
			t.Errorf("Expected user: %+v, Response User: %+v", expectedUser, responseUser)
		}

	})

	t.Run("TestGetUsers", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/user?userIDs=user1,user2", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve user.")
			return
		}

		var responseUser []models.User

		// Unmarshal the response JSON
		if err := json.Unmarshal(w.Body.Bytes(), &responseUser); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
			return
		}

		// Define the expected user
		expectedUser := []models.User{
			{
				UserID:    "user1",
				Phone:     "123-456-7890",
				Address:   "123 Main St",
				FirstName: "John",
				LastName:  "Smith",
				Email:     "john.smith@example.com",
			},
			{
				UserID:    "user2",
				Phone:     "987-654-3210",
				FirstName: "Jane",
				LastName:  "Doe",
				Email:     "jane.doe@example.com",
				Address:   "456 Elm St",
			},
		}

		if !reflect.DeepEqual(expectedUser, responseUser) {
			t.Errorf("Expected user: %+v, Response User: %+v", expectedUser, responseUser)
		}
	})

	t.Run("TestUpdateUser", func(t *testing.T) {
		var updateRequest = UserInfoBody{
			FirstName: "Matt",
			LastName:  "Matt",
			Email:     "Email",
			Phone:     "Phone",
			Address:   "Address",
		}

		requestJSON, err := json.Marshal(updateRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("PUT", "/user/user1", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve user.")
			return
		}

		var responseUser models.User

		// Unmarshal the response JSON
		if err := json.Unmarshal(w.Body.Bytes(), &responseUser); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
			return
		}

		// Define the expected user
		expectedUser := models.User{
			UserID:    "user1",
			FirstName: "Matt",
			LastName:  "Matt",
			Email:     "Email",
			Phone:     "Phone",
			Address:   "Address",
		}

		if !reflect.DeepEqual(expectedUser, responseUser) {
			t.Errorf("Expected user: %+v, Response User: %+v", expectedUser, responseUser)
		}
	})

	t.Run("TestCreateUser", func(t *testing.T) {
		var createRequest = UserInfoBody{
			FirstName: "Matt",
			LastName:  "Matt",
			Email:     "Email",
			Phone:     "Phone",
			Address:   "Address",
		}

		requestJSON, err := json.Marshal(createRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/user/user20", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve user.")
			return
		}

		var responseUser models.User

		// Unmarshal the response JSON
		if err := json.Unmarshal(w.Body.Bytes(), &responseUser); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
			return
		}

		// Define the expected user
		expectedUser := models.User{
			UserID:    "user20",
			FirstName: "Matt",
			LastName:  "Matt",
			Email:     "Email",
			Phone:     "Phone",
			Address:   "Address",
		}

		if !reflect.DeepEqual(expectedUser, responseUser) {
			t.Errorf("Expected user: %+v, Response User: %+v", expectedUser, responseUser)
		}
	})
}
