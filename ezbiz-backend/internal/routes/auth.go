package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/kokweikhong/ezbiz-backend/internal/controller"
)

func NewAuthRoutes(r chi.Router) {
	c := controller.NewAuthController()
	r.Route("/auth", func(r chi.Router) {
		r.Post("/login", c.Login)
	})
}
