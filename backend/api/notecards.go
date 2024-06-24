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
	DeckId int    `json:"deck_id"`
	Front  string `json:"front"`
	Back   string `json:"back"`
	UserId int    `json:"user_id"`
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
		// Inserting new deck into decks
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

func (s *Server) postCardsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var notecards []Notecard
		if err := decoder.Decode(&notecards); err != nil {
			fmt.Println("Error decoding json: post cards handler")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		for _, notecard := range notecards {
			_, err := s.dbpool.Exec(context.Background(), "INSERT INTO cards (deck_id, user_id, front, back) VALUES ($1, $2, $3, $4)", notecard.DeckId, notecard.UserId, notecard.Front, notecard.Back)
			if err != nil {
				fmt.Println("Error inserting into table")
				w.WriteHeader(http.StatusConflict)
				return
			}
		}

		w.WriteHeader(http.StatusCreated)

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
