package api

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

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
