package ezbiz

import (
	"log/slog"
	"os"
	"time"

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
	logger   *slog.Logger
}

func NewApp(server *echo.Echo) *App {
	if err := godotenv.Load(); err != nil {
		slog.Error("No .env file found")
	}

	app := new(App)
	app.server = server
	app.config = configs.NewEzbizConfig()

	// postgres
	// if err := db.InitPostgres(
	// 	app.config.Db.Postgres.Host,
	// 	app.config.Db.Postgres.Port,
	// 	app.config.Db.Postgres.User,
	// 	app.config.Db.Postgres.Password,
	// 	app.config.Db.Postgres.Dbname,
	// 	app.config.Db.Postgres.Sslmode,
	// ); err != nil {
	// 	panic(err)
	// }
	// app.postgres = db.GetPostgres()

	app.jwt = auth.NewJwtAuth(app.config.Auth.Jwt)

	logLevel := new(slog.LevelVar)
	logLevel.Set(slog.LevelDebug)
	loggerOpts := &slog.HandlerOptions{
		AddSource: false,
		Level:     logLevel,
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			if a.Key == slog.TimeKey {
				a.Value = slog.StringValue(time.Now().Format("2006-01-02 15:04:05"))
			}
			return a
		},
	}
	logger := slog.New(slog.NewJSONHandler(os.Stdout, loggerOpts))
	slog.SetDefault(logger)
	app.logger = logger

	app.handler = handlers.NewBaseHandler(app.jwt, app.postgres)

	return app
}

func (a *App) InitApp() {
	a.SetupMiddlewares()
	a.SetupTemplates()
	a.SetupRoutes()
}
