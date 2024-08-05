package handlers

import (
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/kokweikhong/ezbiz/internal/auth"
	"github.com/kokweikhong/ezbiz/internal/services"
	"github.com/labstack/echo/v4"
)

type BaseHandler interface {
	GetAdmin(c echo.Context) error
	GetAuthLogin(c echo.Context) error
	PostAuthLogin(c echo.Context) error

	GetContentsCreate(c echo.Context) error
	GetContentsUpdate(c echo.Context) error
	PostContentsCreate(c echo.Context) error
	PutContentsUpdate(c echo.Context) error
}

type baseHandler struct {
	jwt auth.JwtAuth
	db  *pgxpool.Pool
	srv *service
}

type service struct {
	fs      services.FS
	content services.ContentsService
}

func NewBaseHandler(jwt auth.JwtAuth, db *pgxpool.Pool) BaseHandler {
	srv := &service{
		fs:      services.NewFSService("public"),
		content: services.NewContentsService(db),
	}
	return &baseHandler{
		jwt: jwt,
		db:  db,
		srv: srv,
	}
}
