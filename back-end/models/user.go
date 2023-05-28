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
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
}

type UserDTO struct {
	Name        string `json:"name" bson:"name"`
	Surname     string `json:"surName" bson:"surName"`
	Email       string `json:"email" bson:"email"`
	Password    string `json:"password" bson:"password"`
	PhoneNumber string `json:"phoneNumber" bson:"phoneNumber"`
}

type Event struct {
	ID          string    `json:"id" bson:"id"`
	Title       string    `json:"title" bson:"title"`
	Description string    `json:"description" bson:"description"`
	Status      bool      `json:"status" bson:"status"`
	StartDate   time.Time `json:"startDate" bson:"startDate"`
	EndDate     time.Time `json:"endDate" bson:"endDate"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" bson:"updatedAt"`
}

type EventDTO struct {
	Title       string    `json:"title" bson:"title"`
	Description string    `json:"description" bson:"description"`
	Status      bool      `json:"status" bson:"status"`
	StartDate   time.Time `json:"startDate" bson:"startDate"`
	EndDate     time.Time `json:"endDate" bson:"endDate"`
}
