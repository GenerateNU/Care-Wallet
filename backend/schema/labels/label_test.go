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

	v1 := router.Group("/group")
	{
		LabelGroup(v1, &controller)
	}

	t.Run("TestGetLabelsByGroup", func(t *testing.T) {

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/group/1/labels", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to get labels by group.")
		}

		var getResponse []models.Label
		err = json.Unmarshal(w.Body.Bytes(), &getResponse)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedResponse := []models.Label{
			{
				GroupID:    1,
				LabelName:  "Medication",
				LabelColor: "blue",
			},
			{
				GroupID:    1,
				LabelName:  "Household",
				LabelColor: "purple",
			},
		}

		if !reflect.DeepEqual(expectedResponse, getResponse) {
			t.Error("Result was not correct")
		}

	})

	t.Run("TestCreateNewLabel", func(t *testing.T) {
		postRequest := LabelData{
			LabelName:  "Office",
			LabelColor: "Orange",
		}

		requestJSON, err := json.Marshal(postRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/group/2/labels", bytes.NewBuffer(requestJSON))
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
			GroupID:    2,
			LabelName:  "Office",
			LabelColor: "Orange",
		}

		if !reflect.DeepEqual(expectedResponse, postResponse) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestDeleteLabel", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("DELETE", "/group/2/labels/Appointment", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to delete label.")
		}
	})

	t.Run("TestEditLabel", func(t *testing.T) {
		postRequest := LabelData{
			LabelName:  "Family",
			LabelColor: "Yellow",
		}

		requestJSON, err := json.Marshal(postRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("PATCH", "/group/4/labels/Household", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to edit label.")
		}

		var postResponse models.Label
		err = json.Unmarshal(w.Body.Bytes(), &postResponse)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedResponse := models.Label{
			GroupID:    4,
			LabelName:  "Family",
			LabelColor: "Yellow",
		}

		if !reflect.DeepEqual(expectedResponse, postResponse) {
			t.Error("Result was not correct")
		}
	})
}
