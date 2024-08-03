package handlers

import (
	"log/slog"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

func (h *baseHandler) PostLogin(c echo.Context) error {
	// email and password from form
	email := c.FormValue("email")
	password := c.FormValue("password")
	slog.Info("email: " + email)
	slog.Info("password: " + password)

	claims := h.jwt.NewJwtCustomClaims()
	claims.Name = email
	claims.Admin = true
	claims.Issuer = "ezbiz.maejiccode"
	expires := time.Now().Add(24 * time.Hour)

	token, err := h.jwt.CreateToken(claims, expires)
	if err != nil {
		return err
	}
	cookie := &http.Cookie{
		Name:    "token",
		Value:   token,
		Path:    "/",
		Expires: expires,
		Secure:  false,
	}
	c.SetCookie(cookie)
	// return next(c)
	c.Set("email", email)
	return c.Redirect(302, "/admin")
}
