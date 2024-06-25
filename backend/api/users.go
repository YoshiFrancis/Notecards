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
			fmt.Println("Error decoding request")
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		fmt.Println(user)

		var exists bool
		err := s.dbpool.QueryRow(context.Background(), "select exists ( select username from users where username=$1 )", user.Username).Scan(&exists)
		if err != nil {
			fmt.Println("Error querying database:", err)
			return
		}

		if !exists {
			w.Write([]byte("Username or password incorrect"))
			return
		}

		var password string
		err = s.dbpool.QueryRow(context.Background(), "select passwords from users where username=$1", user.Username).Scan(&password)
		if err != nil {
			fmt.Println("error getting password")
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		if password == user.Password_hash {
			w.Write([]byte("Logged in!"))
		} else {
			w.Write([]byte("Username or password is incorrect!"))
		}
	}
}

func (s *Server) postNewLoginHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var user User

		if err := decoder.Decode(&user); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			fmt.Println("error decoding request json : post new login handler")
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
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		_, err = s.dbpool.Exec(context.Background(), `insert into users (username, passwords) VALUES ($1, $2)`, user.Username, user.Password_hash)

		if err != nil {
			fmt.Println("error inserting into table")
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		fmt.Println("new user inserted!")
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(user.Username))
	}
}
