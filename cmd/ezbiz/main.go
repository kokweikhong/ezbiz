package main

import (
	"fmt"

	"github.com/joho/godotenv"
	"github.com/kokweikhong/ezbiz/internal/ezbiz"
	"github.com/labstack/echo/v4"
)

func main() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")
	}

	appServer := echo.New()
	app := ezbiz.NewApp(appServer)
	app.InitApp()

	// run
	appServer.Start(":8080")
}
