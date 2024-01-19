package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/kokweikhong/ezbiz-backend/internal/controller"
)

func NewContentRoutes(r chi.Router) {
	c := controller.NewContentController()
	r.Route("/contents", func(r chi.Router) {
		r.Get("/", c.GetContents)
		r.Get("/{id}", c.GetContent)
		r.Post("/", c.CreateContent)
		r.Put("/{id}", c.UpdateContent)
		r.Delete("/{id}", c.DeleteContent)
		r.Get("/url/{url}", c.GetContentByUrl)
		r.Get("/user/{id}", c.GetContentsByUserId)
		r.Post("/user/create", c.CreateDefaultContent)
	})
}
