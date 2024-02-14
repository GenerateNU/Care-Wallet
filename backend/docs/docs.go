// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/files/upload": {
            "post": {
                "description": "Upload a file to database and S3 bucket",
                "tags": [
                    "file"
                ],
                "summary": "Upload a file",
                "parameters": [
                    {
                        "type": "file",
                        "description": "Body with file zip",
                        "name": "file_data",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "The userId of the uploader",
                        "name": "upload_by",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "The groupId of the uploader",
                        "name": "group_id",
                        "in": "formData",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.File"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/labels/delete/{gid}/{lname}": {
            "delete": {
                "description": "delete a label",
                "tags": [
                    "labels"
                ],
                "summary": "Delete A Label",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Group to delete label from",
                        "name": "gid",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Name of label to delete",
                        "name": "lname",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Label"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/labels/edit/{gid}/{lname}": {
            "patch": {
                "description": "edit a label",
                "tags": [
                    "labels"
                ],
                "summary": "Edit A Label",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Group of label to edit",
                        "name": "gid",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Name of label to edit",
                        "name": "lname",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Label edit data",
                        "name": "_",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/labels.LabelData"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Label"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/labels/new": {
            "post": {
                "description": "create a new label for a group",
                "tags": [
                    "labels"
                ],
                "summary": "Create A New Label",
                "parameters": [
                    {
                        "description": "Label creation data",
                        "name": "_",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/labels.LabelData"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Label"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/medications": {
            "get": {
                "description": "get all user medications",
                "tags": [
                    "medications"
                ],
                "summary": "Get All Meds",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Medication"
                            }
                        }
                    }
                }
            },
            "post": {
                "description": "add a medication to a users medlist",
                "tags": [
                    "medications"
                ],
                "summary": "add a medication",
                "parameters": [
                    {
                        "description": "a medication",
                        "name": "_",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.Medication"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Medication"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/tasks/assigned": {
            "get": {
                "description": "get tasks assigned to given users",
                "tags": [
                    "tasks"
                ],
                "summary": "Get Tasks Assigned To Given Users",
                "parameters": [
                    {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "collectionFormat": "csv",
                        "name": "userIDs",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Task"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/tasks/filtered": {
            "get": {
                "description": "get filtered tasks",
                "tags": [
                    "tasks"
                ],
                "summary": "Get Filtered Tasks",
                "parameters": [
                    {
                        "type": "string",
                        "name": "createdBy",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "name": "endDate",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "name": "groupID",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "name": "startDate",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "name": "taskID",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "name": "taskStatus",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "name": "taskType",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Task"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/tasks/{tid}/assign": {
            "post": {
                "description": "assign users to task",
                "tags": [
                    "tasks"
                ],
                "summary": "Assign Users To Task",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Task ID to assign users to",
                        "name": "tid",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Users to assign to task and assignee",
                        "name": "_",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/tasks.Assignment"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.TaskUser"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/tasks/{tid}/remove": {
            "delete": {
                "description": "remove users from task",
                "tags": [
                    "tasks"
                ],
                "summary": "Remove Users From Task",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Task ID to remove users from",
                        "name": "tid",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Users to remove from task",
                        "name": "_",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/tasks.Removal"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.TaskUser"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "labels.LabelData": {
            "type": "object",
            "properties": {
                "group_id": {
                    "type": "integer"
                },
                "label_color": {
                    "type": "string"
                },
                "label_name": {
                    "type": "string"
                }
            }
        },
        "models.File": {
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "integer"
                },
                "file_name": {
                    "type": "string"
                },
                "file_size": {
                    "type": "integer"
                },
                "group_id": {
                    "type": "integer"
                },
                "task_id": {
                    "type": "integer"
                },
                "upload_by": {
                    "type": "string"
                },
                "upload_date": {
                    "type": "string"
                }
            }
        },
        "models.Label": {
            "type": "object",
            "properties": {
                "group_id": {
                    "type": "integer"
                },
                "label_color": {
                    "type": "string"
                },
                "label_name": {
                    "type": "string"
                }
            }
        },
        "models.Medication": {
            "type": "object",
            "properties": {
                "medication_id": {
                    "type": "integer"
                },
                "medication_name": {
                    "type": "string"
                }
            }
        },
        "models.Task": {
            "type": "object",
            "properties": {
                "created_by": {
                    "description": "User ID",
                    "type": "string"
                },
                "created_date": {
                    "type": "string"
                },
                "end_date": {
                    "type": "string"
                },
                "group_id": {
                    "type": "integer"
                },
                "notes": {
                    "type": "string"
                },
                "repeating": {
                    "type": "boolean"
                },
                "repeating_end_date": {
                    "type": "string"
                },
                "repeating_interval": {
                    "type": "string"
                },
                "start_date": {
                    "type": "string"
                },
                "task_id": {
                    "type": "integer"
                },
                "task_info": {
                    "type": "string"
                },
                "task_status": {
                    "type": "string"
                },
                "task_type": {
                    "type": "string"
                }
            }
        },
        "models.TaskUser": {
            "type": "object",
            "properties": {
                "taskID": {
                    "type": "integer"
                },
                "userID": {
                    "type": "string"
                }
            }
        },
        "tasks.Assignment": {
            "type": "object",
            "properties": {
                "assigner": {
                    "type": "string"
                },
                "userIDs": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        },
        "tasks.Removal": {
            "type": "object",
            "properties": {
                "userIDs": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "Care-Wallet API",
	Description:      "This is an API for the Care-Wallet App.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
