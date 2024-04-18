package models

type User struct {
	UserID                 string  `json:"user_id"`
	FirstName              string  `json:"first_name"`
	LastName               string  `json:"last_name"`
	Email                  string  `json:"email"`
	Phone                  string  `json:"phone,omitempty"`
	Address                string  `json:"address,omitempty"`
	ProfilePicture         *string `json:"profile_picture,omitempty"`
	DeviceID               string  `json:"device_id,omitempty"`
	PushNotificationEnable bool    `json:"push_notification_enabled"`
}
