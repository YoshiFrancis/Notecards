package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sort"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
)

type Deck struct {
	User_id  int    `json:"user_id"`
	Username string `json:"username"`
	Deck_id  int    `json:"deck_id,omitempty"`
	Title    string `json:"title"`
}

type Notecard struct {
	DeckId int    `json:"deck_id"`
	Front  string `json:"front"`
	Back   string `json:"back"`
	UserId int    `json:"user_id"`
	CardId int    `json:"card_id,omitempty"`
}

func (s *Server) getDeckListHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		query := "SELECT users.user_id, users.username, decks.deck_id, decks.title FROM users JOIN decks ON users.user_id=decks.user_id"
		rows, err := s.dbpool.Query(context.Background(), query)
		if err != nil {
			fmt.Println("Error getting deck list query")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		var deck_id int
		var deck_title string
		var user_id int
		var username string

		decks := make([]Deck, 0)
		pgx.ForEachRow(rows, []any{&user_id, &username, &deck_id, &deck_title}, func() error {
			decks = append(decks, Deck{user_id, username, deck_id, deck_title})
			return nil
		})

		decksJson, _ := json.Marshal(decks)
		w.Write(decksJson)
	}

}

func (s *Server) getUserDeckListHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		username := vars["username"]
		fmt.Println(username)
		query := "SELECT users.user_id, decks.deck_id, decks.title FROM users JOIN decks ON users.user_id=decks.user_id WHERE users.username=$1"
		rows, err := s.dbpool.Query(context.Background(), query, username)
		if err != nil {
			fmt.Println("Error getting deck list query")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		var deck_id int
		var deck_title string
		var user_id int

		decks := make([]Deck, 0)
		pgx.ForEachRow(rows, []any{&user_id, &deck_id, &deck_title}, func() error {
			decks = append(decks, Deck{user_id, username, deck_id, deck_title})
			return nil
		})

		decksJson, _ := json.Marshal(decks)
		w.Write(decksJson)
	}

}

func (s *Server) getDeckHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		username := vars["username"]
		deckTitle := vars["deckTitle"]
		query := "SELECT cards.card_id, cards.front, cards.back, cards.user_id, cards.deck_id FROM decks JOIN users on users.user_id=decks.user_id JOIN cards ON decks.deck_id=cards.deck_id WHERE decks.title=$1 AND users.username=$2"
		rows, err := s.dbpool.Query(context.Background(), query, deckTitle, username)
		if err != nil {
			fmt.Println("Error querying rows for cards in deck handler")
			w.WriteHeader(http.StatusBadRequest)
		}

		var card_id, user_id, deck_id int
		var front, back string
		cards := make([]Notecard, 0)
		pgx.ForEachRow(rows, []any{&card_id, &front, &back, &user_id, &deck_id}, func() error {
			cards = append(cards, Notecard{deck_id, front, back, user_id, card_id})
			return nil
		})

		sort.Slice(cards, func(i, j int) bool {
			return cards[i].CardId < cards[j].CardId
		})

		cardsJson, _ := json.Marshal(cards)
		w.Write(cardsJson)
	}
}

// //
// // TODO: authentication
// //
func (s *Server) postDeckHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)

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
			return
		}

		var deck_id int
		err = s.dbpool.QueryRow(context.Background(), "SELECT deck_id FROM decks WHERE title=$1 AND user_id=$2", deckReq.Title, deckReq.User_id).Scan(&deck_id)
		if err != nil {
			fmt.Println("Error querying for deck_id: post deck handler")
			w.WriteHeader(http.StatusExpectationFailed)
			return
		}
		// Also inserting a note row into notes
		_, err = s.dbpool.Exec(context.Background(), "INSERT INTO notes (user_id, deck_id, text) VALUES ($1, $2, $3)", deckReq.User_id, deck_id, "")
		if err != nil {
			fmt.Println("Error inserting notes: post deck handler")
			w.WriteHeader(http.StatusExpectationFailed)
			return
		}
		deckReq.Deck_id = deck_id
		deckJson, _ := json.Marshal(deckReq)
		w.WriteHeader(http.StatusCreated)
		w.Write(deckJson)
	}
}

// / TODO: authentication
func (s *Server) postCardsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var notecards []Notecard
		if err := decoder.Decode(&notecards); err != nil {
			fmt.Println("Error decoding json: post cards handler")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		fmt.Println("helllo")

		for _, notecard := range notecards {
			fmt.Println(notecard.DeckId, notecard.UserId, notecard.Front, notecard.Back)
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

func (s *Server) deleteDecksHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		fmt.Println("in delete decks handler")
		decoder := json.NewDecoder(req.Body)
		var decks []Deck
		if err := decoder.Decode(&decks); err != nil {
			fmt.Println("Error decoding json: delete deck handler")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		for _, deck := range decks {
			fmt.Println(deck.Deck_id, deck.Title, deck.User_id)
			if deck.User_id == 0 {
				fmt.Println("Must be logged in!")
				w.WriteHeader(http.StatusBadRequest)
				return
			}
			_, err := s.dbpool.Exec(context.Background(), "DELETE from decks WHERE deck_id=$1 AND title=$2 AND user_id=$3", deck.Deck_id, deck.Title, deck.User_id)
			if err != nil {
				fmt.Println("Error deleting from decks table")
				w.WriteHeader(http.StatusBadRequest)
				return
			}
		}
		w.WriteHeader(http.StatusOK)
	}
}

func (s *Server) deleteCardsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		fmt.Println("In delete!")
		decoder := json.NewDecoder(req.Body)
		var notecards []Notecard
		if err := decoder.Decode(&notecards); err != nil {
			fmt.Println("Error decoding json: delete notecard handler")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		for _, notecard := range notecards {
			_, err := s.dbpool.Exec(context.Background(), "DELETE from cards WHERE deck_id=$1 AND user_id=$2 AND card_id=$3", notecard.DeckId, notecard.UserId, notecard.CardId)
			if err != nil {
				fmt.Println("Error deleting from cards table")
				w.WriteHeader(http.StatusBadRequest)
				return
			}
		}

		w.WriteHeader(http.StatusOK)
	}
}

func (s *Server) updateCardsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		fmt.Println("in update cards handler")
		decoder := json.NewDecoder(req.Body)
		var notecards []Notecard
		if err := decoder.Decode(&notecards); err != nil {
			fmt.Println("Error json decoding in update cards handler")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		for _, notecard := range notecards {
			_, err := s.dbpool.Exec(context.Background(), "UPDATE cards SET front=$1, back=$2 WHERE deck_id=$3 AND user_id=$4 AND card_id=$5", notecard.Front, notecard.Back, notecard.DeckId, notecard.UserId, notecard.CardId)
			if err != nil {
				fmt.Println("Error updating notecard")
				w.WriteHeader(http.StatusBadRequest)
				return
			}
		}

		w.WriteHeader(http.StatusAccepted)
	}
}
