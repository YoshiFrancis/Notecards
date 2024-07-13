package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Note struct {
	User_id int    `json:"user_id"`
	Deck_id int    `json:"deck_id"`
	Text    string `json:"text"`
}

func (s *Server) getNotesHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		user_id := vars["userId"]
		deckId := vars["deckId"]

		var note Note
		err := s.dbpool.QueryRow(context.Background(), "SELECT notes.user_id, notes.deck_id, notes.text FROM notes WHERE notes.user_id=$1 AND notes.deck_id=$2", user_id, deckId).Scan(&note.User_id, &note.Deck_id, &note.Text)
		if err != nil {
			fmt.Println("Error querying for the notes!")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusFound)
		jsonNote, _ := json.Marshal(note)
		w.Write(jsonNote)

	}
}

func (s *Server) updateNotesHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var note Note
		if err := decoder.Decode(&note); err != nil {
			fmt.Println("Error json decoding in updating notes handler")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		_, err := s.dbpool.Exec(context.Background(), "UPDATE notes SET text=$1 WHERE user_id=$2 AND deck_id=$3", note.Text, note.User_id, note.Deck_id)

		if err != nil {
			fmt.Println("Error updating notes!")
			w.WriteHeader(http.StatusBadRequest)
		}
		w.WriteHeader(http.StatusOK)
	}
}
