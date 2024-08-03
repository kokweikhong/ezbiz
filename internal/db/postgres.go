package db

import (
	"context"
	"log/slog"

	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	PgDB *pgxpool.Pool
)

func InitPostgres(host, port, user, password, dbname, sslmode string) error {
	connStr := "host=" + host + " port=" + port + " user=" + user + " password=" + password + " dbname=" + dbname + " sslmode=" + sslmode
	pool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		slog.Error("Unable to create connection pool", "msg", err)
		return err
	}
	slog.Info("Postgres connected")

	// ping
	if err := pool.Ping(context.Background()); err != nil {
		slog.Error("Unable to ping to database", "msg", err)
		return err
	}
	slog.Info("Postgres pinged")

	PgDB = pool
	return nil
}

func ClosePostgres() {
	PgDB.Close()
}

func GetPostgres() *pgxpool.Pool {
	return PgDB
}

func GetPostgresConn() *pgxpool.Conn {
	conn, _ := PgDB.Acquire(context.Background())
	return conn
}
