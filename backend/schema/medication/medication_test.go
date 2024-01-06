package medication

import (
	"carewallet/backend/db"
	"carewallet/backend/types"
	"carewallet/configuration"
	"database/sql"
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

	"github.com/huandu/go-assert"
)

func TestDBConnection(t *testing.T) {
	config, err := configuration.GetConfiguration()

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to retreive configuration file: %v\n", err)
		os.Exit(1)
	}

	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable",
		config.Database.Username,
		config.Database.Password,
		config.Database.Host,
		config.Database.Port,
		config.Database.DatabaseName,
	)

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		t.Fatalf("failed to connect to the database: %v", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		t.Fatalf("failed to ping the database: %v", err)
	}
}

func TestGetMedication(t *testing.T) {
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

	router.GET("/medications", controller.GetMedications)

	a := assert.New(t)

	t.Run("TestGetMedication", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/medications", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var responseMedication []types.Medication
		err := json.Unmarshal(w.Body.Bytes(), &responseMedication)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Define the expected medication data
		expectedMedication := []types.Medication{
			{MedicationID: 1,
				MedicationName: "Medication A"},
			{MedicationID: 2,
				MedicationName: "Medication B"},
			{MedicationID: 3,
				MedicationName: "Medication C"},
			{MedicationID: 4,
				MedicationName: "Medication D"},
			{MedicationID: 5,
				MedicationName: "Medication E"},
		}

		assert.Assert(t, slices.Equal(expectedMedication, responseMedication))
	})

}
