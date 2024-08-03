package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type getAdminResponse struct {
	Email        string `json:"email"`
	TotalContent int    `json:"total_content"`
}

func (h *baseHandler) GetAdmin(c echo.Context) error {
	res := new(getAdminResponse)
	res.Email = "asd"
	res.TotalContent = 10

	// email := c.Get("email")

	return c.Render(http.StatusOK, "admin", res)
}
