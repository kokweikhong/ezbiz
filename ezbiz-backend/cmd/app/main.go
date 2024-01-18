package main

import (
	"log/slog"
	"os"

	"github.com/joho/godotenv"
	"github.com/kokweikhong/ezbiz-backend/internal/db"
	"github.com/kokweikhong/ezbiz-backend/internal/routes"
)

func main() {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	configPath := wd + "/.env"

	if err := godotenv.Load(configPath); err != nil {
		panic(err)
	}

	slog.Info("Database configuration",
		"host", os.Getenv("DB_HOST"),
		"port", os.Getenv("DB_PORT"),
		"user", os.Getenv("DB_USER"),
		"password", os.Getenv("DB_PASSWORD"),
		"name", os.Getenv("DB_NAME"),
	)

	if err := db.ConnectDB(
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	); err != nil {
		panic(err)
	}

	router := routes.InitRoutes()

	routes.RunServer(router, "8080")
}
