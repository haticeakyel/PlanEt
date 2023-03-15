package main

import (
	"github.com/gofiber/fiber"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	repository := NewRepository()
	service := NewService(repository)
	api := NewApi(&service)
	app := SetupApp(&api)
	app.Listen(":3001")
}

func SetupApp(api *Api) *fiber.App {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	return app
}
