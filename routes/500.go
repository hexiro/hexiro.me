package routes

import (
	"github.com/gofiber/fiber/v2"
	"hexiro/config"
)

func InternalServerError(ctx *fiber.Ctx) error {
	return ctx.Status(500).Render("error", map[string]interface{}{
		"status":  500,
		"message": config.Messages.RandomMessage(500),
	})
}
