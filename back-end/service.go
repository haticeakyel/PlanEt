package main

import (
	"errors"
	"strings"
	"time"

	model "example.com/greetings/models"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
func (s *Service) CreateEvent(eventDTO model.EventDTO, userId string) (*model.Event, error) {
	eventCreate := model.Event{
		ID:          GenerateUUID(8),
		UserId:      userId,
		Title:       eventDTO.Title,
		Description: eventDTO.Description,
		Status:      eventDTO.Status,
		StartDate:   eventDTO.StartDate,
		EndDate:     eventDTO.EndDate,
		CreatedAt:   primitive.NewDateTimeFromTime(time.Now().UTC().Round(time.Second)),
		UpdatedAt:   primitive.NewDateTimeFromTime(time.Now().UTC().Round(time.Second)),
	}

	eventCreated, err := s.Repository.CreateEvent(userId, eventCreate)
	if err != nil {
		return nil, err
	}

	return eventCreated, nil
}

func (s *Service) GetEvents(userId string) ([]model.Event, error) {
	eventsListed, err := s.Repository.GetEvents(userId)

	if err != nil {
		return nil, err
	}

	return eventsListed, nil
}

func (s *Service) GetEvent(userID,ID string) (*model.Event, error) {

	updatedEvent, err := s.Repository.GetEvent(userID,ID)

	if err != nil {
		return nil, err
	}

	return updatedEvent, nil
}

func (s *Service) DeleteEvent(userId,ID string) error {

	err := s.Repository.DeleteEvent(userId,ID)

	if err != nil {
		return err
	}

	return nil
}
