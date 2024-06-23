package main

import (
	"log"
	"net/http"

	// "encoding/json"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/yoshifrancis/not-the-cards/api"
)

var dbpool *pgxpool.Pool

func main() {

	s := api.NewServer()
	defer s.dbpool.Close()

	log.Fatal(http.ListenAndServe(":4221", s))

}
