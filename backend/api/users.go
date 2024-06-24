package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

func (s *Server) postLoginHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var user User

		if err := decoder.Decode(&user); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var password string
		err := s.dbpool.QueryRow(context.Background(), "select password from users where username='$1'", user.Password_hash).Scan(&password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		if password != "" {
			w.WriteHeader(http.StatusFound)
		} else {
			w.WriteHeader(http.StatusNotFound)
		}
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
		fmt.Println(user.Username, user.Password_hash)
		var exists bool
		err := s.dbpool.QueryRow(context.Background(), "select exists ( select username from users where username=$1 )", user.Username).Scan(&exists)
		if err != nil {
			fmt.Println("Error querying database:", err)
			return
		}

		if exists {
			fmt.Println("username already exists")
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = s.dbpool.Exec(context.Background(), `insert into users (username, passwords) VALUES ($1, $2)`, user.Username, user.Password_hash)

		if err != nil {
			fmt.Println("error inserting into table")
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.Write([]byte(user.Username))
	}
}
