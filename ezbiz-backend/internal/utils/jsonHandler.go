package utils

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

type JsonHandler interface {
	ReadJSON(w http.ResponseWriter, r *http.Request, payload interface{})
	ResponseJSON(w http.ResponseWriter, status int, payload interface{})
	ResponseError(w http.ResponseWriter, status int, message string)
}

type jsonHandler struct{}

func NewJsonHandler() JsonHandler {
	return &jsonHandler{}
}

func (h *jsonHandler) ReadJSON(w http.ResponseWriter, r *http.Request, payload interface{}) {
	err := json.NewDecoder(r.Body).Decode(payload)
	if err != nil {
		slog.Error("ReadJSON", "err", err.Error())
		h.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}
}

func (*jsonHandler) ResponseJSON(w http.ResponseWriter, status int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write([]byte(response))
}

func (*jsonHandler) ResponseError(w http.ResponseWriter, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write([]byte(message))
}
