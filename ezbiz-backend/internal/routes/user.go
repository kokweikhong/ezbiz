package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/kokweikhong/ezbiz-backend/internal/controller"
)

func NewUserRoutes(r chi.Router) {
	c := controller.NewUserController()
	r.Route("/users", func(r chi.Router) {
		r.Get("/", c.GetUsers)
		r.Get("/{id}", c.GetUser)
		r.Post("/", c.CreateUser)
		r.Put("/{id}", c.UpdateUser)
		r.Delete("/{id}", c.DeleteUser)
		r.Post("/change-password", c.ChangePassword)
	})
}
