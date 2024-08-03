package configs

import "os"

type EzbizConfig struct {
	Port       string
	ContentDir string
	Db         *DbConfig
	Auth       *AuthConfig
}

type DbConfig struct {
	Postgres *PostgresConfig
}

type PostgresConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Dbname   string
	Sslmode  string
}

type AuthConfig struct {
	Jwt *JwtConfig
}

type JwtConfig struct {
	Secret string
}

func NewEzbizConfig() *EzbizConfig {
	db := NewDbConfig()
	auth := NewAuthConfig()
	return &EzbizConfig{
		Port:       os.Getenv("EZBIZ_PORT"),
		ContentDir: os.Getenv("EZBIZ_CONTENT_DIR"),
		Db:         db,
		Auth:       auth,
	}
}

func NewAuthConfig() *AuthConfig {
	return &AuthConfig{
		Jwt: &JwtConfig{
			Secret: os.Getenv("JWT_SECRET"),
		},
	}
}

func NewDbConfig() *DbConfig {
	pg := &PostgresConfig{
		Host:     os.Getenv("POSTGRES_HOST"),
		Port:     os.Getenv("POSTGRES_PORT"),
		User:     os.Getenv("POSTGRES_USER"),
		Password: os.Getenv("POSTGRES_PASSWORD"),
		Dbname:   os.Getenv("POSTGRES_DB"),
		Sslmode:  os.Getenv("POSTGRES_SSLMODE"),
	}
	return &DbConfig{
		Postgres: pg,
	}
}
