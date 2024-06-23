package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	// "encoding/json"
	"context"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
)

var dbpool *pgxpool.Pool

func main() {
	var err error
	dbpool, err = pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}
	defer dbpool.Close()

	var greeting string
	err = dbpool.QueryRow(context.Background(), "select 'Hello, world!'").Scan(&greeting)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(greeting)

	router := mux.NewRouter()
	router.HandleFunc("/create/", postDeckHandler).Methods("POST")
	router.HandleFunc("/create/{deckId}/", postCardHandler).Methods("POST")
	router.HandleFunc("/create/{deckId}/", deleteDeckHandler).Methods("DELETE")
	router.HandleFunc("/create/{deckId}/{cardId}/", deleteCardHandler).Methods("DELETE")
	router.HandleFunc("/{username}/notecards/", getDeckListHandler).Methods("GET")
	router.HandleFunc("/{username}/notecards/{deckId}/", getDeckHandler).Methods("GET")

	fmt.Println("Running")
	log.Fatal(http.ListenAndServe(":4221", router))

	// i would like some login functionality eventually
	// router.HandleFunc("/login/", postLoginHandler).Methods("POST")
}

func getDeckListHandler(w http.ResponseWriter, req *http.Request) {
	var greeting string
	err := dbpool.QueryRow(context.Background(), "select 'Hello, world!'").Scan(&greeting)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(greeting)
}

func getDeckHandler(w http.ResponseWriter, req *http.Request) {
	var greeting string
	err := dbpool.QueryRow(context.Background(), "select 'Hello, world!'").Scan(&greeting)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(greeting)
}

func postDeckHandler(w http.ResponseWriter, req *http.Request) {

}

func postCardHandler(w http.ResponseWriter, req *http.Request) {

}

func deleteDeckHandler(w http.ResponseWriter, req *http.Request) {

}

func deleteCardHandler(w http.ResponseWriter, req *http.Request) {

}
