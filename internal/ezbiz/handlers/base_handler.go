package handlers

import (
	"github.com/kokweikhong/ezbiz/internal/auth"
	"github.com/labstack/echo/v4"
)

type BaseHandler interface {
	GetAdmin(c echo.Context) error
	GetLogin(c echo.Context) error
	PostLogin(c echo.Context) error
}

type baseHandler struct {
	jwt auth.JwtAuth
}

func NewBaseHandler(jwt auth.JwtAuth) BaseHandler {
	return &baseHandler{jwt: jwt}
}
