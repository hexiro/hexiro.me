package routes

import (
	"github.com/gofiber/fiber/v2"
	"hexiro/config"
	"hexiro/crawler/github"
)

//func Index(writer http.ResponseWriter, req *http.Request) {
//	renderer.HTML(writer, 200, "html/index", map[string]interface{}{
//		"projects": github.Repos,
//		"config":   config.Config,
//	})
//}

func Index(ctx *fiber.Ctx) error {
	return ctx.Render("html/index", map[string]interface{}{
			"projects": github.Repos,
			"config":   config.Config,
		})
}