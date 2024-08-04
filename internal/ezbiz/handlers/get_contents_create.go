package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *baseHandler) GetContentsCreate(c echo.Context) error {
	data := struct {
		ID string
	}{
		ID: "123",
	}
	return c.Render(http.StatusOK, "create-content", data)
}
