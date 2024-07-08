package main

import (
	"log"
	"net/http"

	// "encoding/json"

	"github.com/rs/cors"
	"github.com/yoshifrancis/not-the-cards/api"
)

func main() {

	s := api.NewServer()
	defer s.Close()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPut},
	})

	handler := c.Handler(s)

	log.Fatal(http.ListenAndServe(":4221", handler))

}
