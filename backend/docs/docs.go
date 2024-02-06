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
        "/care-groups/:groupName": {
            "post": {
                "description": "Creates a new care group with the provided group name.",
                "tags": [
                    "groups"
                ],
                "summary": "Creates a care group",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.CareGroup"
                            }
                        }
                    }
                }
            }
        },
        "/care-groups/addUser/:userId/:groupId/:role": {
            "post": {
                "description": "Adds a user to a care group given a userID, groupID, and role",
                "tags": [
                    "groups"
                ],
                "summary": "Adds a user to a care group",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.CareGroup"
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
        }
    },
    "definitions": {
        "models.CareGroup": {
            "type": "object",
            "properties": {
                "date_created": {
                    "type": "string"
                },
                "group_id": {
                    "type": "integer"
                },
                "group_name": {
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
