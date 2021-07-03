package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html"
	"hexiro/config"
	"hexiro/routes"
	"os"
)

func main() {
	engine := html.New("views", ".html")
	if !config.Server.Production {
		engine.Reload(true)
	}

	app := fiber.New(fiber.Config{
		Views:     engine,
		BodyLimit: -1,
		GETOnly:   true,
	})
	// setup logger
	app.Use(logger.New())
	// mount routes
	app.Mount("/", routes.Router)
	// setup static
	app.Static("/", "public", fiber.Static{
		Index: "",
	})
	app.Get("*", routes.NotFound)
	// Heroku sets a port for you
	if config.Server.Production {
		app.Listen(":" + os.Getenv("PORT"))
	} else {
		app.Listen(":" + config.Server.Port)
	}

}
