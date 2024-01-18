package db

import (
	"database/sql"
	"fmt"
	"log/slog"

	_ "github.com/lib/pq"
)

var postgresDB *sql.DB

func ConnectDB(host, port, user, password, db string) error {
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, db)

	pDb, err := sql.Open("postgres", connStr)
	if err != nil {
		slog.Error("Error opening database", "error", err.Error())
		return err
	}

	if err = pDb.Ping(); err != nil {
		slog.Error("Error connecting to database", "error", err.Error())
		return err
	}

	postgresDB = pDb

	slog.Info("Connected to database")

	return nil
}

func CloseDB() {
	postgresDB.Close()
}

func GetDB() *sql.DB {
	return postgresDB
}
