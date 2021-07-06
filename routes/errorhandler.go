package routes

import (
	"github.com/gofiber/fiber/v2"
	"hexiro/config"
	"log"
)

func ErrorHandler(ctx *fiber.Ctx, err error) error {
	// Status status defaults to 500
	log.Println("what")
	var status int
	var message string
	if e, ok := err.(*fiber.Error); ok {
		status = e.Code
		message = err.Error()
	} else {
		status = fiber.StatusInternalServerError
		message = config.Messages.RandomMessage(status)
	}
	return ctx.Status(status).Render("html/error", map[string]interface{}{
		"status": status,
		"message": message,
	})
}
