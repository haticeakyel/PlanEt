package main

import (
	"time"

	model "example.com/greetings/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

type Api struct {
	Service *Service
}

func NewApi(service *Service) Api {
	return Api{
		Service: service,
	}
}

func (a *Api) HandleRegister(c *fiber.Ctx) error {

	userDTO := model.UserDTO{}
	err := c.BodyParser(&userDTO)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}
	userCreate := a.Service.HandleRegister(userDTO)
	switch err {
	case nil:
		c.JSON(userCreate)
		c.Status(fiber.StatusCreated)
	default:
		c.JSON(err.Error())
		c.Status(fiber.StatusInternalServerError)
	}
	return nil
}

const SecretKey = "secret"

func (a *Api) LoginUser(c *fiber.Ctx) error {

	loginUser := model.UserDTO{}

	err := c.BodyParser(&loginUser)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    loginUser.Email,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
	}

	cookie := fiber.Cookie{
		Name:     "user_token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: false,
	}

	c.Cookie(&cookie)

	userLogin, err := a.Service.PostLogin(loginUser)

	switch err {
	case nil:
		c.JSON(userLogin)
		c.Status(fiber.StatusCreated)
	case UserNotFoundError:
		c.Status(fiber.StatusUnauthorized)

	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil

}
func (a *Api) AuthenticatedUser(c *fiber.Ctx) error {
	cookie := c.Cookies("user_token")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)

		return c.JSON(fiber.Map{
			"message": "unauthententicated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)
	email := claims.Issuer
	user, err := a.Service.AuthenticatedUser(email)

	switch err {
	case nil:
		c.JSON(user)
	case UserNotFoundError:
		c.Status(fiber.StatusUnauthorized)

	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil

}

func (a *Api) LogOut(c *fiber.Ctx) error {

	cookie := fiber.Cookie{
		Name:     "user_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	c.JSON(fiber.Map{"message": "success"})
	c.Status(fiber.StatusOK)
	return nil

}

func (a *Api) HandleCreateEvent(c *fiber.Ctx) error {
	userId := c.Params("userId")

	eventDTO := model.EventDTO{}
	err := c.BodyParser(&eventDTO)
	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return err
	}
	eventCreate, err := a.Service.CreateEvent(eventDTO, userId)
	switch err {
	case nil:
		c.JSON(eventCreate)
		c.Status(fiber.StatusCreated)
	default:
		c.Status(fiber.StatusInternalServerError)
		c.JSON(fiber.Map{"error": err.Error()})
	}

	return nil
}

func (a *Api) HandleGetEvents(c *fiber.Ctx) error {
	userId := c.Params("userId")
	events, err := a.Service.GetEvents(userId)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch events",
		})
	}

	return c.JSON(events)
}

func (a *Api) HandleGetEvent(c *fiber.Ctx) error {
	userId := c.Params("userId")
	ID := c.Params("id")

	event, err := a.Service.GetEvent(userId,ID)

	switch err {
	case nil:
		c.JSON(event)
		c.Status(fiber.StatusOK)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}

func (a *Api) HandleDeleteEvent(c *fiber.Ctx) error {
	userId := c.Params("userId")
	ID := c.Params("id")

	err := a.Service.DeleteEvent(userId, ID)

	switch err {
	case nil:
		c.Status(fiber.StatusNoContent)
	default:
		c.Status(fiber.StatusInternalServerError)
	}

	return nil
}
