package routes

import (
	"hexiro/config"
	"net/http"
)

func NotFound(writer http.ResponseWriter, request *http.Request) {
	renderer.HTML(writer, 404, "views/error", map[string]interface{}{
		"status":  404,
		"message": config.Messages.RandomMessage(404),
	})
	//return ctx.Status(404).Render("error", map[string]interface{}{
	//	"status": 404,
	//	"message": config.Messages.RandomMessage(404),
	//})
}
