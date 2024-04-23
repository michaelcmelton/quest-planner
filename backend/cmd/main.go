package main

import (
	"fmt"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /_health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "healthy\n")
	})

	http.ListenAndServe(":8080", mux)
}
