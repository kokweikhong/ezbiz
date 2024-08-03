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

	contents := admin.Group("/contents")
	contents.GET("/create", a.handler.GetContentsCreate)
	// admin.GET("/create-content", adminH.AdminIndex)
	admin.GET("/update-content", nil)

	admin.GET("/create-user", nil)
	admin.GET("/update-user", nil)

	auth := a.server.Group("/auth")
	auth.GET("/login", a.handler.GetAuthLogin)
	auth.POST("/login", a.handler.PostAuthLogin)
	auth.POST("/register", nil)

}
