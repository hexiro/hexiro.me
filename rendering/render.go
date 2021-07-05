package rendering

import (
	"gopkg.in/unrolled/render.v1"
	"hexiro/config"
	"hexiro/directory"
)


var (
	Templates = render.New(render.Options{
		Directory:  directory.Main("templates"),
		Extensions: []string{".html", ".svg"},
	})
	Css = render.New(render.Options{
		Directory:  directory.Main("/assets/css"),
		Extensions: []string{".css"},
		HTMLContentType: "text/css",
		IsDevelopment:   config.Server.Development(),
	})
	Js = render.New(render.Options{
		Directory:  directory.Main("/assets/js"),
		Extensions: []string{".js"},
		HTMLContentType: "text/javascript",
		IsDevelopment:   config.Server.Development(),
	})
)