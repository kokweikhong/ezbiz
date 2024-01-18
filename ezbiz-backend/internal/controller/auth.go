package controller

import (
	"net/http"

	"github.com/kokweikhong/ezbiz-backend/internal/service"
	"github.com/kokweikhong/ezbiz-backend/internal/utils"
)

type AuthController interface {
	Login(w http.ResponseWriter, r *http.Request)
}

type authController struct {
	srv   service.AuthService
	jsonH utils.JsonHandler
}

func NewAuthController() AuthController {
	return &authController{
		srv:   service.NewAuthService(),
		jsonH: utils.NewJsonHandler(),
	}
}

func (c *authController) Login(w http.ResponseWriter, r *http.Request) {
	userAuth := struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}{}

	c.jsonH.ReadJSON(w, r, &userAuth)

	user, err := c.srv.Login(userAuth.Email, userAuth.Password)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusUnauthorized, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, user)
}
