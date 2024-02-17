package task_labels

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

func TestTaskLabelsGroup(t *testing.T) {
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

	t.Run("TestGetTaskLabels", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/1/labels", nil)
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to get labels by task.")
		}

		var getResponse []LabelData
		err = json.Unmarshal(w.Body.Bytes(), &getResponse)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedResponse := []LabelData{
			{
				GroupID:   1,
				LabelName: "Medication",
			},
		}

		if !reflect.DeepEqual(expectedResponse, getResponse) {
			t.Error("Failed to get the expected response")
		}
	})

	t.Run("TestAddTaskLabels", func(t *testing.T) {
		postRequest := LabelData{
			GroupID:   1,
			LabelName: "Household",
		}

		requestJSON, err := json.Marshal(postRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/tasks/1/labels", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to assign new label.")
		}

		var postResponse models.Task_Label
		err = json.Unmarshal(w.Body.Bytes(), &postResponse)

		if err != nil {
			t.Error("Failed to unmarshal json")
		}

		expectedResponse := models.Task_Label{
			GroupId:   1,
			TaskId:    1,
			LabelName: "Household",
		}

		if !reflect.DeepEqual(expectedResponse, postResponse) {
			t.Error("Result was not correct")
		}
	})

	t.Run("TestRemoveTaskLabels", func(t *testing.T) {
		postRequest := LabelData{
			GroupID:   1,
			LabelName: "Medication",
		}

		requestJSON, err := json.Marshal(postRequest)
		if err != nil {
			t.Error("Failed to marshal remove request to JSON")
		}

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("DELETE", "/tasks/1/labels", bytes.NewBuffer(requestJSON))
		router.ServeHTTP(w, req)

		if http.StatusOK != w.Code {
			t.Error("Failed to remove label.")
		}
	})
}
