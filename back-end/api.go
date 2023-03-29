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

func (a *Api) LoginUser(c *fiber.Ctx) error {

	const SecretKey = "secret"

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
		HTTPOnly: true,
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
