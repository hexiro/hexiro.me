package routes

import (
	"github.com/gofiber/fiber/v2"
	"hexiro/config"
	"hexiro/crawler/github"
)

func Index(ctx *fiber.Ctx) error {
	return ctx.Render("index", map[string]interface{}{
		"Projects": github.Repos,
		"Config":   config.Config,
	})
}
