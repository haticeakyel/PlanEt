package main

import (
	model "example.com/greetings/models"
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
