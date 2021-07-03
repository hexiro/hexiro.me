package routes

import "github.com/gofiber/fiber/v2"

var (
	Router = fiber.New()
)

func init() {
	Router.Get("/", Index)
	Router.Get("/404", NotFound)
}
