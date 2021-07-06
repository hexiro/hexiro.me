package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html"
	"hexiro/config"
	"hexiro/routes"
	"log"
	"os"
	"time"
)

func main() {
	// templating
	templates := html.New("./templates", ".html")
	templates.Reload(config.Server.Production())

	app := fiber.New(fiber.Config{
		Views:        templates,
		BodyLimit:    -1,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
		GETOnly:      true,
		ErrorHandler: routes.ErrorHandler,
	})

	// logger
	app.Use(logger.New())

	// index
	app.Get("/", routes.Index)

	// assets
	app.Static("/", "public", fiber.Static{
		ByteRange:     true,
		Index:         "",
		CacheDuration: 12 * time.Hour,
		MaxAge:        600,
	})

	app.Get("*", routes.NotFound)

	var port string
	if envPort := os.Getenv("PORT"); envPort != "" && config.Server.Production() {
		port = envPort
	} else {
		port = config.Server.Port
	}
	log.Fatal(app.Listen(":" + port))
}
