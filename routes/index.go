package routes

import (
	"github.com/gofiber/fiber/v2"
	"hexiro/config"
	"hexiro/crawler/github"
)

func Index(ctx *fiber.Ctx) error {
	return ctx.Render("html/index", map[string]interface{}{
		"projects": github.Repos,
		"config":   config.Config,
	})
}
