package handlers

import (
	"bytes"
	"html"
	"io"
	"log/slog"
	"net/http"
	"path/filepath"

	"github.com/google/uuid"
	"github.com/kokweikhong/ezbiz/internal/sqlc/store"
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
	slog.Debug("ID", "id", id)
	payload := new(putContentsUpdatePayload)
	if err := c.Bind(payload); err != nil {
		res := newToast(true, "Invalid payload")
		return c.Render(http.StatusInternalServerError, "toast", res)
	}
	payload.ID = id

	favicon, err := h.saveFile(c, "favicon", "uploads/favicon")
	if err != nil && favicon != "" {
		slog.Error("Error saving favicon", "error", err)
		res := newToast(true, "Error saving favicon")
		return c.Render(http.StatusInternalServerError, "toast", res)
	}

	profile, err := h.saveFile(c, "profileImage", "uploads/profile")
	if err != nil && profile != "" {
		slog.Error("Error saving profile", "error", err)
		res := newToast(true, "Error saving profile")
		return c.Render(http.StatusInternalServerError, "toast", res)
	}

	bg, err := h.saveFile(c, "backgroundImage", "uploads/background")
	if err != nil && bg != "" {
		slog.Error("Error saving background", "error", err)
		res := newToast(true, "Error saving background")
		return c.Render(http.StatusInternalServerError, "toast", res)
	}

	content, err := h.srv.content.GetContentById(c.Request().Context(), uuid.MustParse(payload.ID))
	if err != nil {
		slog.Error("Error getting content", "error", err)
		res := newToast(true, "Error getting content")
		return c.Render(http.StatusInternalServerError, "toast", res)
	}

	if favicon != "" {
		content.Favicon = favicon
	} else {
		favicon = content.Favicon
	}

	if profile != "" {
		content.ProfileImage = profile
	} else {
		profile = content.ProfileImage
	}

	if bg != "" {
		content.BackgroundImage = bg
	} else {
		bg = content.BackgroundImage
	}

	arg := new(store.UpdateContentParams)
	arg.ID = uuid.MustParse(payload.ID)
	arg.Url = payload.URL
	arg.Title = payload.Title
	arg.Subtitle = payload.Subtitle
	arg.Color = payload.Color
	arg.About = html.UnescapeString(payload.About)

	if err := h.srv.content.UpdateContent(c.Request().Context(), arg); err != nil {
		slog.Error("Error updating content", "error", err)
		res := newToast(true, "Error updating content")
		return c.Render(http.StatusInternalServerError, "toast", res)
	}

	res := newToast(false, "Content updated")
	return c.Render(http.StatusOK, "toast", res)
}

func (h *baseHandler) saveFile(c echo.Context, key string, newName string) (string, error) {
	file, err := c.FormFile(key)
	if err != nil {
		if err == http.ErrMissingFile {
			slog.Error("No file found", "msg", err)
			return "", nil
		}
		slog.Error("Error getting file", "error", err)
		return "", err
	}

	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	dst := new(bytes.Buffer)
	if _, err := io.Copy(dst, src); err != nil {
		return "", err
	}

	ext := filepath.Ext(file.Filename)
	newPath := newName + ext

	if err := h.srv.fs.SaveFile(newPath, dst.Bytes()); err != nil {
		return "", err
	}

	return newPath, nil
}
