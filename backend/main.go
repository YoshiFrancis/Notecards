package main

import (
	"log"
	"net/http"

	// "encoding/json"

	"github.com/yoshifrancis/not-the-cards/api"
)

func main() {

	s := api.NewServer()
	defer s.Close()
	log.Fatal(http.ListenAndServe(":4221", s))

}
