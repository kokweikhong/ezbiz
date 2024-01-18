package controller

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/kokweikhong/ezbiz-backend/internal/model"
	"github.com/kokweikhong/ezbiz-backend/internal/service"
	"github.com/kokweikhong/ezbiz-backend/internal/utils"
)

type SocialController interface {
	GetSocials(w http.ResponseWriter, r *http.Request)
	GetSocial(w http.ResponseWriter, r *http.Request)
	CreateSocial(w http.ResponseWriter, r *http.Request)
	UpdateSocial(w http.ResponseWriter, r *http.Request)
	DeleteSocial(w http.ResponseWriter, r *http.Request)
}

type socialController struct {
	srv   service.SocialService
	jsonH utils.JsonHandler
}

func NewSocialController() SocialController {
	return &socialController{
		srv:   service.NewSocialService(),
		jsonH: utils.NewJsonHandler(),
	}
}

func (c *socialController) GetSocials(w http.ResponseWriter, r *http.Request) {
	socials, err := c.srv.GetSocials()
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, socials)
}

func (c *socialController) GetSocial(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	// convert to int64
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	social, err := c.srv.GetSocial(id)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, social)
}

func (c *socialController) CreateSocial(w http.ResponseWriter, r *http.Request) {
	social := new(model.Social)
	c.jsonH.ReadJSON(w, r, social)

	pk, err := c.srv.CreateSocial(social)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, pk)
}

func (c *socialController) UpdateSocial(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	social := new(model.Social)
	c.jsonH.ReadJSON(w, r, social)
	social.Id = id

	err = c.srv.UpdateSocial(social)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, social)
}

func (c *socialController) DeleteSocial(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	// convert to int64
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	err = c.srv.DeleteSocial(id)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, "Social deleted successfully")
}
