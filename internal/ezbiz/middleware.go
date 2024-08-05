package ezbiz

import (
	"context"
	"log/slog"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func (a *App) SetupMiddlewares() {
	a.server.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogStatus:   true,
		LogMethod:   true,
		LogURI:      true,
		LogError:    true,
		HandleError: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			if v.Error == nil {
				a.logger.LogAttrs(context.Background(), slog.LevelInfo, "REQUEST",
					slog.String("uri", v.URI),
					slog.String("method", v.Method),
					slog.Int("status", v.Status),
				)
			} else {
				a.logger.LogAttrs(context.Background(), slog.LevelError, "REQUEST",
					slog.String("uri", v.URI),
					slog.String("method", v.Method),
					slog.Int("status", v.Status),
					slog.String("err", v.Error.Error()),
				)
			}
			return nil
		},
	}))

	a.server.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE, echo.OPTIONS},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		MaxAge:       86400,
	}))

	// a.server.Use(middleware.Logger())
	a.server.Use(middleware.Recover())

	a.server.Pre(middleware.RemoveTrailingSlash())

}

func (a *App) JwtAuthMiddleware() echo.MiddlewareFunc {
	claims := a.jwt.NewJwtCustomClaims()
	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return claims
		},
		SigningKey: []byte(a.config.Auth.Jwt.Secret),
		ErrorHandler: func(c echo.Context, err error) error {
			return c.Redirect(302, "/auth/login")
		},
	}
	return echojwt.WithConfig(config)
}

func (a *App) JwtFromCookie(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("token")
		if err != nil {
			return c.Redirect(302, "/auth/login")
		}
		token := cookie.Value
		c.Request().Header.Set("Authorization", "Bearer "+token)
		return next(c)
	}
}
