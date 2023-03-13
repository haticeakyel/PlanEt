package model

import "time"

type User struct {
	ID          string    `json:"id" bson:"id"`
	Name        string    `json:"name" bson:"name"`
	Surname     string    `json:"surName" bson:"surName"`
	Email       string    `json:"email" bson:"email"`
	PhoneNumber string    `json:"phoneNumber" bson:"phoneNumber"`
	Password    string    `json:"password" bson:"password"`
	BirthDate   time.Time `json:"birthDate" bson:"birthDate"`
}
