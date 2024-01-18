package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/kokweikhong/ezbiz-backend/internal/controller"
)

func NewFileRoutes(r chi.Router) {
	fileCtrl := controller.NewFileController()
	r.Route("/file", func(r chi.Router) {
		r.Get("/", fileCtrl.GetFiles)
		r.Post("/upload", fileCtrl.UploadFile)
		r.Delete("/", fileCtrl.DeleteFile)
	})
}
