package handlers

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/google/uuid"
	"github.com/kokweikhong/ezbiz/internal/sqlc/store"
	"github.com/labstack/echo/v4"
)

type postContentsCreatePayload struct {
	UserID string `json:"userID" form:"userID"`
	Title  string `json:"title" form:"title"`
	URL    string `json:"url" form:"url"`
}

func (h *baseHandler) PostContentsCreate(c echo.Context) error {
	payload := new(postContentsCreatePayload)
	if err := c.Bind(payload); err != nil {
		slog.Error("Error binding payload", "error", err)
		return c.HTML(http.StatusInternalServerError, "Error binding payload")
	}

	arg := new(store.CreateContentParams)
	arg.UserID = uuid.MustParse(payload.UserID)
	arg.Title = payload.Title
	arg.Url = payload.URL

	id, err := h.srv.content.CreateContent(c.Request().Context(), arg)
	if err != nil {
		slog.Error("Error creating content", "error", err)
		return c.HTML(http.StatusInternalServerError, "Error creating content")
	}

	res := fmt.Sprintf("Content created with ID: %s", id)

	return c.JSON(http.StatusOK, res)
}
