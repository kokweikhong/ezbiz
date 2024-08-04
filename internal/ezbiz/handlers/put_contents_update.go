package handlers

import (
	"html"
	"net/http"

	"github.com/labstack/echo/v4"
)

type putContentsUpdatePayload struct {
	ID       string `json:"id" form:"id"`
	URL      string `json:"url" form:"url"`
	Title    string `json:"title" form:"title"`
	Subtitle string `json:"subtitle" form:"subtitle"`
	Color    string `json:"color" form:"color"`
	About    string `json:"about" form:"about"`
}

func (h *baseHandler) PutContentsUpdate(c echo.Context) error {
	id := c.Param("id")
	payload := new(putContentsUpdatePayload)
	if err := c.Bind(payload); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	payload.ID = id
	payload.About = html.UnescapeString(payload.About)

	// j, err := json.MarshalIndent(payload.About, "", "  ")
	// if err != nil {
	// 	return c.JSON(http.StatusInternalServerError, err)
	// }

	return c.HTML(http.StatusOK, payload.About)
}
