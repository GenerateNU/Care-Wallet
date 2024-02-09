package grouproles

import (
	"carewallet/configuration"
	"carewallet/db"
	"fmt"
	"os"
	"strconv"
	"testing"

	"encoding/json"
	"net/http"
	"net/http/httptest"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func TestGetGroupRoles(t *testing.T) {
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
		GetGroupRolesGroup(v1, &controller)
	}

	t.Run("TestGetGroupRoles", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/group-roles/get-group/user123", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve group roles.")
		}

		var responseGroupID int

		// Unmarshal the response JSON directly into a string variable
		if err := json.Unmarshal(w.Body.Bytes(), &responseGroupID); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
		}
		responseGroupIDString := strconv.Itoa(responseGroupID)

		// Define the expected group ID
		expectedGroupID := "1"

		// Compare the expected group ID with the actual group ID from the response
		if expectedGroupID != responseGroupIDString {
			t.Errorf("Expected group ID: %s, Actual group ID: %s", expectedGroupID, responseGroupIDString)
		} else {
			fmt.Println("TestGetGroupRoles passed")
		}
	})
}
