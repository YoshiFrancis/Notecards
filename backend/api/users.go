package api

import (
	"context"
	"encoding/json"
	"net/http"
)

func (s *Server) postLoginHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

	}
}

func (s *Server) postNewLoginHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var user User

		if err := decoder.Decode(&user); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var username string
		err := s.dbpool.QueryRow(context.Background(), "select name from widgets where username=$1", user.Username).Scan(&username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if username != "" {
			w.WriteHeader(http.StatusBadRequest)
		}

		err = s.dbpool.QueryRow(context.Background(), `insert into users ( ('$1', '$2') )`, user.Username, user.Password_hash).Scan(&username)

		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}
