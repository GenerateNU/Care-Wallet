package labels

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

func TestLabelGroup(t *testing.T) {
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
		LabelGroup(v1, &controller)
	}

	t.Run("TestCreateNewLabel", func(t *testing.T) {
		postRequest := LabelCreation{
			GroupID:    1,
			LabelName:  "Laundry",
			LabelColor: "Orange",
		}

		requestJSON, err := json.Marshal(postRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/labels/new", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to create new label.")
		}

		var postResponse models.Label
		err = json.Unmarshal(w.Body.Bytes(), &postResponse)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedResponse := models.Label{
			GroupID:    1,
			LabelName:  "Laundry",
			LabelColor: "Orange",
		}

		if !reflect.DeepEqual(expectedResponse, postResponse) {
			t.Error("Result was not correct")
		}
	})
}
