package routes

import (
	"gopkg.in/unrolled/render.v1"
	"hexiro/directory"
)

var (
	renderer = render.New(render.Options{
		Directory:  directory.Main("templates"),
		Extensions: []string{".html", ".svg"},
	})
)
