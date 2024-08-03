package ezbiz

import (
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/kokweikhong/ezbiz/internal/auth"
	"github.com/kokweikhong/ezbiz/internal/configs"
	"github.com/kokweikhong/ezbiz/internal/ezbiz/handlers"
	"github.com/labstack/echo/v4"
)

type App struct {
	server   *echo.Echo
	postgres *pgxpool.Pool
	config   *configs.EzbizConfig
	jwt      auth.JwtAuth
	handler  handlers.BaseHandler
}

func NewApp(server *echo.Echo) *App {
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")
	}

	app := new(App)
	app.server = server
	app.config = configs.NewEzbizConfig()
	app.jwt = auth.NewJwtAuth(app.config.Auth.Jwt)
	app.handler = handlers.NewBaseHandler(app.jwt)

	return app
}

func (a *App) InitApp() {
	a.SetupMiddlewares()
	a.SetupTemplates()
	a.SetupRoutes()
}
