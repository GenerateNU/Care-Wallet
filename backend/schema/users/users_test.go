package users

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

func TestGetGroupIDByUID(t *testing.T) {
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
		GetUsersGroup(v1, &controller)
	}

	t.Run("TestGetGroupIDByUID", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/users/get-group/1", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		if http.StatusOK != w.Code {
			t.Error("Failed to retrieve user's groupID.")
		}

		var responseMedication []models.Medication
		err := json.Unmarshal(w.Body.Bytes(), &responseMedication)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}
	})
}
