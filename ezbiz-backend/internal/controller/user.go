package controller

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/kokweikhong/ezbiz-backend/internal/model"
	"github.com/kokweikhong/ezbiz-backend/internal/service"
	"github.com/kokweikhong/ezbiz-backend/internal/utils"
)

type UserController interface {
	GetUsers(w http.ResponseWriter, r *http.Request)
	GetUser(w http.ResponseWriter, r *http.Request)
	CreateUser(w http.ResponseWriter, r *http.Request)
	UpdateUser(w http.ResponseWriter, r *http.Request)
	DeleteUser(w http.ResponseWriter, r *http.Request)
	ChangePassword(w http.ResponseWriter, r *http.Request)
}

type userController struct {
	srv   service.UserService
	jsonH utils.JsonHandler
}

func NewUserController() UserController {
	return &userController{
		srv:   service.NewUserService(),
		jsonH: utils.NewJsonHandler(),
	}
}

func (c *userController) GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := c.srv.GetUsers()
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, users)
}

func (c *userController) GetUser(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	user, err := c.srv.GetUser(id)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, user)
}

func (c *userController) CreateUser(w http.ResponseWriter, r *http.Request) {
	user := new(model.User)
	c.jsonH.ReadJSON(w, r, user)

	createdUser, err := c.srv.CreateUser(user)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusCreated, createdUser)
}

func (c *userController) UpdateUser(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	user := new(model.User)
	c.jsonH.ReadJSON(w, r, user)
	user.Id = id

	updatedUser, err := c.srv.UpdateUser(user)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, updatedUser)
}

func (c *userController) DeleteUser(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	err = c.srv.DeleteUser(id)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, nil)
}

func (c *userController) ChangePassword(w http.ResponseWriter, r *http.Request) {
	changePasswordBody := struct {
		Email        string `json:"email"`
		OldPassword  string `json:"oldPassword"`
		NewPassword  string `json:"newPassword"`
	}{}

	c.jsonH.ReadJSON(w, r, &changePasswordBody)

	err := c.srv.ChangePassword(changePasswordBody.Email, changePasswordBody.OldPassword, changePasswordBody.NewPassword)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, "Password changed successfully")
}
