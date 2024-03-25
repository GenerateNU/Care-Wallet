package grouproles

import (
	"carewallet/configuration"
	"carewallet/db"
	"carewallet/models"
	"fmt"
	"os"
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

	v1 := router.Group("/group")
	{
		GroupRolesGroup(v1, &controller)
	}

	t.Run("TestGetGroupRoles", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/group/member/user1", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve group roles.")
		}

		var responseGroup models.GroupRole

		// Unmarshal the response JSON
		if err := json.Unmarshal(w.Body.Bytes(), &responseGroup); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
		}

		// Define the expected group
		expectedGroup := models.GroupRole{GroupID: 1, Role: "PATIENT", UserID: "user1"}

		if expectedGroup != responseGroup {
			t.Errorf("Expected group ID: %+v, Actual group ID: %+v", expectedGroup, responseGroup)
		}
	})

	t.Run("TestRemoveUserFromGroup", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("DELETE", "/group/5/fIoFY26mJnYWH8sNdfuVoxpnVnr1", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to remove user from group.")
		}
	})

	t.Run("TestAddUserToGroup", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("PUT", "/group/1/fIoFY26mJnYWH8sNdfuVoxpnVnr1/SECONDARY", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to remove user from group.")
		}
	})

	t.Run("TestChangeUserGroupRole", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("PATCH", "/group/5/JamnX6TZf0dt6juozMRzNG5LMQd2/PATIENT", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to change user role in group.")
		}
	})
}
