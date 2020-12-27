package utils

import (
	"books-list/models"
	"encoding/json"
	"net/http"
)

//SendError returns an error to the caller
func SendError(w http.ResponseWriter, status int, err models.Error) {
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(err)
}

//SendSuccess returns a succesful response to the caller
func SendSuccess(w http.ResponseWriter, data interface{}) {
	json.NewEncoder(w).Encode(data)
}
