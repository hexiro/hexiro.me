package directory

import (
	"os"
	"path/filepath"
)

var (
	mainLocation, _ = os.Getwd()
)

func Main(path string) string {
	if path == "" || path == "." {
		return mainLocation
	}
	if relative, err := filepath.Rel(path, mainLocation); err == nil {
		return filepath.Join(mainLocation, relative)
	}
	return filepath.Join(mainLocation, path)
}