package groups

import (
	"carewallet/configuration"
	"carewallet/db"
	"fmt"
	"os"
	"slices"
	"testing"

	"encoding/json"
	"net/http"
	"net/http/httptest"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func TestGetGroupMembers(t *testing.T) {
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
		CreateCareGroup(v1, &controller)
	}

	t.Run("TestGetGroupMembers", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/care-groups/1/member", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve group roles.")
		}

		var responseUsers []string

		if err := json.Unmarshal(w.Body.Bytes(), &responseUsers); err != nil {
			t.Errorf("Failed to unmarshal JSON: %v", err)
		}

		// Define the expected users
		expectedUsers := []string{
			"user123",
			"user456",
		}

		if !slices.Equal(expectedUsers, responseUsers) {
			t.Error("Result was not correct")
		}
	})
}
