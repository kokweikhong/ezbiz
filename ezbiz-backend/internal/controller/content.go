package controller

import (
	"log/slog"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/kokweikhong/ezbiz-backend/internal/model"
	"github.com/kokweikhong/ezbiz-backend/internal/service"
	"github.com/kokweikhong/ezbiz-backend/internal/utils"
)

type ContentController interface {
	GetContents(w http.ResponseWriter, r *http.Request)
	GetContent(w http.ResponseWriter, r *http.Request)
	CreateContent(w http.ResponseWriter, r *http.Request)
	UpdateContent(w http.ResponseWriter, r *http.Request)
	DeleteContent(w http.ResponseWriter, r *http.Request)
	GetContentByUrl(w http.ResponseWriter, r *http.Request)
	GetContentsByUserId(w http.ResponseWriter, r *http.Request)
	CreateDefaultContent(w http.ResponseWriter, r *http.Request)
}

type contentController struct {
	srv   service.ContentService
	jsonH utils.JsonHandler
}

func NewContentController() ContentController {
	return &contentController{
		srv:   service.NewContentService(),
		jsonH: utils.NewJsonHandler(),
	}
}

func (c *contentController) GetContents(w http.ResponseWriter, r *http.Request) {
	contents, err := c.srv.GetContents()
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, contents)
}

func (c *contentController) GetContent(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	content, err := c.srv.GetContent(id)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, content)
}

func (c *contentController) CreateContent(w http.ResponseWriter, r *http.Request) {
	content := &model.Content{}
	c.jsonH.ReadJSON(w, r, content)

	pk, err := c.srv.CreateContent(content)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusCreated, pk)
}

func (c *contentController) UpdateContent(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
        slog.Error("UpdateContent", "err", err.Error())
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	content := &model.Content{}
	c.jsonH.ReadJSON(w, r, content)
	content.Id = id

	content, err = c.srv.UpdateContent(content)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, content)
}

func (c *contentController) DeleteContent(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	err = c.srv.DeleteContent(id)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, nil)
}

func (c *contentController) GetContentByUrl(w http.ResponseWriter, r *http.Request) {
	url := chi.URLParam(r, "url")

	contents, err := c.srv.GetContentByUrl(url)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, contents)
}

func (c *contentController) GetContentsByUserId(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	contents, err := c.srv.GetContentsByUserId(id)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, contents)
}

func (c *contentController) CreateDefaultContent(w http.ResponseWriter, r *http.Request) {
	data := struct {
		UserId int64  `json:"userId"`
		Url    string `json:"url"`
	}{}

	c.jsonH.ReadJSON(w, r, &data)

	pk, err := c.srv.CreateDefaultContent(data.UserId, data.Url)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusCreated, pk)
}
