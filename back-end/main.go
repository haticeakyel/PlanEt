package main

import (
	"github.com/gofiber/fiber/v2"
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

	//authentication
	app.Post("/register", api.HandleRegister)
	app.Post("/login", api.LoginUser)
	app.Get("/user", api.AuthenticatedUser)
	app.Post("/logout", api.LogOut)

	//event
	app.Post("/users/:userId/events", api.HandleCreateEvent)
	app.Get("/users/:userId/events", api.HandleGetEvents)
	app.Get("/users/:userId/events/:id", api.HandleGetEvent)
	app.Delete("/users/:userId/events/:id", api.HandleDeleteEvent)

	return app
}
