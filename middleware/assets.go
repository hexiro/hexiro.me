package middleware

import (
	"hexiro/config"
	"hexiro/directory"
	"hexiro/rendering"
	"io/ioutil"
	"mime"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
)

type assetsHandler struct{}

func (a *assetsHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	cleanPath := path.Clean(request.URL.Path)
	extension := filepath.Ext(cleanPath)
	staticLocation := filepath.Join("public", cleanPath)
	staticLocation = directory.Main(staticLocation)
	templateLocation := directory.Main(cleanPath)

	if a.fileExists(staticLocation) {
		file, err := ioutil.ReadFile(staticLocation)
		if err != nil {
			panic(err)
		}
		writer.Header().Set("Content-Type", mime.TypeByExtension(filepath.Ext(extension)))
		writer.Write(file)
	} else if a.fileExists(templateLocation) {
		binding := map[string]interface{}{
			"config": config.Config,
		}
		name := strings.TrimSuffix(cleanPath, extension)
		name = filepath.Base(name)
		switch extension {
		case ".css":
			rendering.Css.HTML(writer, 200, name, binding)
		case ".js":
			rendering.Js.HTML(writer, 200, name, binding)
		}
	} else {
		http.NotFound(writer, request)
	}
}

func (a assetsHandler) fileExists(location string) bool {
	file, err := os.Stat(location)
	if err != nil {
		return false
	}
	return !file.IsDir()

}

func AssetsHandler() http.Handler {
	return &assetsHandler{}
}
