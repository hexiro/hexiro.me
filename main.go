package main

import (
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"hexiro/config"
	"hexiro/routes"
	"net/http"
	"os"
	"time"
)

func main() {
	router := mux.NewRouter()

	// logger
	router.Use(func(next http.Handler) http.Handler {
		return handlers.LoggingHandler(os.Stdout, next)
	})
	// index
	router.HandleFunc("/", routes.Index)

	// static assets
	router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("./public/assets"))))

	// 404s
	router.NotFoundHandler = http.HandlerFunc(routes.NotFound)

	var port string
	if config.Server.Production {
		port = os.Getenv("PORT")
	} else {
		port  = config.Server.Port
	}

	server := &http.Server{
		Handler: router,
		Addr:    ":" + port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	server.ListenAndServe()
}
