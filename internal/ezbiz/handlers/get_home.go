package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *baseHandler) GetHome(c echo.Context) error {
	return c.Render(http.StatusOK, "index", nil)
}
