package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *baseHandler) GetContentsCreate(c echo.Context) error {
	return c.Render(http.StatusOK, "create-content", nil)
}
