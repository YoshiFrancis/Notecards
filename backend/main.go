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

	handler := cors.Default().Handler(s)

	log.Fatal(http.ListenAndServe(":4221", handler))

}
