package api

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

type User struct {
	User_id       int    `json:"user_id"`
	Username      string `json:"username"`
	Password_hash string `json:"password"`
}

type Server struct {
	*mux.Router
	dbpool *pgxpool.Pool
}

func NewServer() *Server {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v\n", err)
		os.Exit(1)
	}
	dbpool_, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}

	s := &Server{
		Router: mux.NewRouter(),
		dbpool: dbpool_,
	}
	s.routes()
	return s
}

func (s *Server) Close() {
	s.dbpool.Close()
}

func (s *Server) routes() {
	s.HandleFunc("/create", s.postDeckHandler()).Methods("POST")
	s.HandleFunc("/create/{deckName}", s.postCardsHandler()).Methods("POST")
	s.HandleFunc("/create/{deckName}/", s.deleteDecksHandler()).Methods("DELETE")
	s.HandleFunc("/notecards", s.getDeckListHandler()).Methods("GET")
	s.HandleFunc("/notecards/{username}", s.getUserDeckListHandler()).Methods("GET")
	s.HandleFunc("/notecards/{username}/{deckTitle}", s.getDeckHandler()).Methods("GET")
	s.HandleFunc("/notecards/{username}/{decktitle}/edit", s.deleteCardsHandler()).Methods("DELETE")

	s.HandleFunc("/login", s.postLoginHandler()).Methods("POST")
	s.HandleFunc("/login/new/", s.postNewLoginHandler()).Methods("POST")
}
