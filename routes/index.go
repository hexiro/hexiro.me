package routes

import (
	"hexiro/config"
	"hexiro/crawler/github"
	"net/http"
)

func Index(writer http.ResponseWriter, req *http.Request) {
	renderer.HTML(writer, 200, "html/index", map[string]interface{}{
		"Projects": github.Repos,
		"Config":   config.Config,
	})
	//return ctx.Render("index", map[string]interface{}{
	//	"Projects": github.Repos,
	//	"Config":   config.Config,
	//})
}
