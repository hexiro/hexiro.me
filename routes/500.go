package routes

import (
	"hexiro/config"
	"net/http"
)

func InternalServerError(writer http.ResponseWriter, request *http.Request) {
	renderer.HTML(writer, 404, "html/error", map[string]interface{}{
		"status":  500,
		"message": config.Messages.RandomMessage(500),
	})
}
