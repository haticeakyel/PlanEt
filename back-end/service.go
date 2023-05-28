package main

import (
	"errors"
	"strings"
	"time"

	model "example.com/greetings/models"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	Repository *Repository
}

func NewService(Repository *Repository) Service {
	return Service{
		Repository: Repository,
	}
}

func GenerateUUID(length int) string {
	uuid := uuid.New().String()

	uuid = strings.ReplaceAll(uuid, "-", "")

	if length < 1 {
		return uuid
	}
	if length > len(uuid) {
		length = len(uuid)
	}

	return uuid[0:length]
}

func (s *Service) HandleRegister(userDTO model.UserDTO) *model.User {

	userRegister := model.User{}

	password, _ := bcrypt.GenerateFromPassword([]byte(userDTO.Password), 14)

	userRegister.ID = GenerateUUID(8)
	userRegister.Name = userDTO.Name
	userRegister.Surname = userDTO.Surname
	userRegister.Email = userDTO.Email
	userRegister.PhoneNumber = userDTO.PhoneNumber
	userRegister.Password = string(password)
	userRegister.CreatedAt = time.Now().UTC().Round(time.Second)

	err := s.Repository.PostRegister(userRegister)

	if err != nil {
		return nil
	}

	return &userRegister

}

var UserNotFoundError error = errors.New("User not found")

func (service Service) PostLogin(loginUser model.UserDTO) (*model.User, error) {

	userEmail, err := service.Repository.GetUser(loginUser.Email)

	if err != nil {
		return nil, UserNotFoundError
	}

	err = bcrypt.CompareHashAndPassword([]byte(userEmail.Password), []byte(loginUser.Password))

	if err != nil {
		return nil, err
	}

	return &userEmail, nil
}

func (service *Service) AuthenticatedUser(email string) (*model.User, error) {

	user, err := service.Repository.GetUser(email)

	if err != nil {
		return nil, UserNotFoundError
	}
	return &user, nil
}

/*
	 func (s *Service) LogOut(userDTO model.UserDTO) (*model.User, error) {

		userEmail, err := s.Repository.GetUser(userDTO.Email)

		if err != nil {
			return nil, UserNotFoundError
		}

		return &userEmail, nil

}
*/
func (s *Service) CreateEvent(eventDTO model.EventDTO) (*model.Event, error) {
	eventCreate := model.Event{
		ID:          GenerateUUID(8),
		Title:       eventDTO.Title,
		Description: eventDTO.Description,
		Status:      eventDTO.Status,
		StartDate:   eventDTO.StartDate,
		EndDate:     eventDTO.EndDate,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	eventCreate, err := s.Repository.CreateEvent(eventCreate)
	if err != nil {
		return nil, err
	}

	return &eventCreate, nil
}
