package main

import (
	"github.com/gorilla/mux"
	"github.com/tdewolff/minify"
	"github.com/tdewolff/minify/css"
	"github.com/tdewolff/minify/html"
	"hexiro/config"
	"hexiro/middleware"
	"hexiro/routes"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	router := mux.NewRouter()

	// minifier
	minifier := minify.New()
	minifier.AddFunc("text/css", css.Minify)
	minifier.AddFunc("text/html", html.Minify)
	router.Use(minifier.Middleware)

	// logger
	router.Use(func(next http.Handler) http.Handler {
		return middleware.LoggingHandler(log.Writer(), next)
	})

	// index
	router.HandleFunc("/", routes.Index).Methods("GET")

	// static assets
	staticHandler := http.StripPrefix("/assets/", http.FileServer(http.Dir("./public/assets")))
	router.PathPrefix("/assets").Handler(staticHandler).Methods("GET")

	// 404s
	router.NotFoundHandler = http.HandlerFunc(routes.NotFound)

	var port string
	if envPort := os.Getenv("PORT"); envPort != "" && config.Server.Production() {
		port = envPort
	} else {
		port = config.Server.Port
	}

	server := &http.Server{
		Handler:      router,
		Addr:         ":" + port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Println("Listening on", server.Addr)
	log.Fatal(server.ListenAndServe())
}
