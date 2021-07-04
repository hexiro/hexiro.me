package routes

import (
	"gopkg.in/unrolled/render.v1"
	"hexiro/directory"
)

type Render struct {
	*render.Render
}

var (
	renderer = Render{render.New(render.Options{
		Directory:  directory.Main("templates"),
		Extensions: []string{".html", ".svg"},
	})}
)
