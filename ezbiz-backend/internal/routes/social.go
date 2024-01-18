package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/kokweikhong/ezbiz-backend/internal/controller"
)

func NewSocialRoutes(r chi.Router) {
	c := controller.NewSocialController()
	r.Route("/socials", func(r chi.Router) {
		r.Get("/", c.GetSocials)
		r.Get("/{id}", c.GetSocial)
		r.Post("/", c.CreateSocial)
		r.Put("/{id}", c.UpdateSocial)
		r.Delete("/{id}", c.DeleteSocial)
	})
}
