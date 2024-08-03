package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *baseHandler) GetLogin(c echo.Context) error {
	return c.Render(http.StatusOK, "login", nil)
}
