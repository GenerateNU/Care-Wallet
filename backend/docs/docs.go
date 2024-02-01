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
                "responses": {
                    "200": {
                        "description": "OK"
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
            }
        },
        "/tasks/{endDate}": {
            "get": {
                "description": "get all tasks by end date",
                "tags": [
                    "tasks"
                ],
                "summary": "Get All Tasks By End Date",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Task"
                            }
                        }
                    }
                }
            }
        },
        "/tasks/{gid}": {
            "get": {
                "description": "get all tasks by group id",
                "tags": [
                    "tasks"
                ],
                "summary": "Get All Tasks By Group ID",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Task"
                            }
                        }
                    }
                }
            }
        },
        "/tasks/{startDate}": {
            "get": {
                "description": "get all tasks by start date",
                "tags": [
                    "tasks"
                ],
                "summary": "Get All Tasks By Start Date",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Task"
                            }
                        }
                    }
                }
            }
        },
        "/tasks/{status}": {
            "get": {
                "description": "get all tasks by status",
                "tags": [
                    "tasks"
                ],
                "summary": "Get All Tasks By Status",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Task"
                            }
                        }
                    }
                }
            }
        },
        "/tasks/{type}": {
            "get": {
                "description": "get all tasks by type",
                "tags": [
                    "tasks"
                ],
                "summary": "Get All Tasks By Type",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Task"
                            }
                        }
                    }
                }
            }
        },
        "/tasks/{uid}": {
            "get": {
                "description": "get all tasks by user id",
                "tags": [
                    "tasks"
                ],
                "summary": "Get All Tasks By User ID",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Task"
                            }
                        }
                    }
                }
            }
        }
    },
    "definitions": {
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
