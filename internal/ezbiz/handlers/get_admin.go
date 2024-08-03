package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *baseHandler) GetAdmin(c echo.Context) error {
	email := c.Get("email")
	return c.Render(http.StatusOK, "admin", email)
}
