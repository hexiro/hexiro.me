package routes

import (
	"github.com/gofiber/fiber/v2"
	"hexiro/config"
)

func NotFound(ctx *fiber.Ctx) error {
	return ctx.Status(404).Render("html/error", map[string]interface{}{
		"status":  404,
		"message": config.Messages.RandomMessage(404),
	})
}
