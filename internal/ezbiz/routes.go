package ezbiz

import (
	"net/http"

	"github.com/kokweikhong/ezbiz/web"
	"github.com/labstack/echo/v4"
)

func (a *App) SetupRoutes() {
	dist := web.GetDist()
	assetHandler := http.FileServer(web.GetEmbedFileSytem(dist, "dist"))
	a.server.GET("/dist/*", echo.WrapHandler(
		http.StripPrefix("/dist/", assetHandler),
	))

	// appH := handlers.NewAppHandler(createToken)
	//
	// adminH := NewAdminHandler()
	// // authH := NewAuthHandler()
	//
	admin := a.server.Group("/admin")
	admin.Use(a.JwtFromCookie)
	admin.Use(a.JwtAuthMiddleware())
	admin.GET("", a.handler.GetAdmin)
	// admin.GET("/create-content", adminH.AdminIndex)
	admin.GET("/update-content", nil)

	admin.GET("/create-user", nil)
	admin.GET("/update-user", nil)

	auth := a.server.Group("/auth")
	auth.GET("/login", a.handler.GetLogin)
	auth.POST("/register", nil)

	api := a.server.Group("/api/v1")
	api.GET("/content", nil)
	api.POST("/login", a.handler.PostLogin)

}
