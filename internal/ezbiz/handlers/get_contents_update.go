package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *baseHandler) GetContentsUpdate(c echo.Context) error {
	id := c.Param("id")
	data := struct {
		ID string
	}{
		ID: id,
	}
	return c.Render(http.StatusOK, "update-content", data)
}
