package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Deck struct {
	User_id int    `json:"user_id"`
	Title   string `json:"title"`
}

type Notecard struct {
	DeckId int    `json:"id"`
	Front  string `json:"front"`
	Back   string `json:"back"`
}

func (s *Server) getDeckListHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		username := vars["username"]
		fmt.Println(username)
	}

}

func (s *Server) getDeckHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		vars := mux.Vars(req)
		username := vars["username"]
		deckId := vars["deckId"]
		fmt.Println(username)
		fmt.Println(deckId)
	}
}

func (s *Server) postDeckHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		// TODO: authentication
		var deckReq Deck
		if err := decoder.Decode(&deckReq); err != nil {
			fmt.Println("Error json decoding: post deck handler")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		// checking if deck title already exists
		var exists bool
		err := s.dbpool.QueryRow(context.Background(), "SELECT EXISTS (SELECT title FROM decks WHERE title=$1)", deckReq.Title).Scan(&exists)
		if err != nil {
			fmt.Println("Error querying : post deck handler")
			w.WriteHeader(http.StatusExpectationFailed)
			return
		}
		if exists {
			w.Write([]byte("Deck title already exists"))
			return
		}

		_, err = s.dbpool.Exec(context.Background(), "INSERT INTO decks (title, user_id) VALUES ($1, $2)", deckReq.Title, deckReq.User_id)
		if err != nil {
			fmt.Println("Error inserting : post deck handler")
			w.WriteHeader(http.StatusExpectationFailed)
		} else {
			w.WriteHeader(http.StatusCreated)
		}

		fmt.Println("Inserted new thing into decks!")

	}
}

func (s *Server) postCardHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

	}
}

func (s *Server) deleteDeckHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

	}
}

func (s *Server) deleteCardHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

	}
}
