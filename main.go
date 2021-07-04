package main

import (
	"github.com/gorilla/mux"
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

	// logger
	router.Use(func(next http.Handler) http.Handler {
		return middleware.LoggingHandler(log.Writer(), next)
	})
	// index
	router.HandleFunc("/", routes.Index).Methods("GET")

	// static assets
	router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("./public/assets")))).Methods("GET")

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
