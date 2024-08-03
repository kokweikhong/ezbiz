package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/kokweikhong/ezbiz/internal/configs"
)

type JwtAuth interface {
	NewJwtCustomClaims() *JwtCustomClaims
	CreateToken(claims *JwtCustomClaims, expires time.Time) (string, error)
}

type jwtAuth struct {
	config *configs.JwtConfig
}

func NewJwtAuth(config *configs.JwtConfig) JwtAuth {
	return &jwtAuth{
		config: config,
	}
}

type JwtCustomClaims struct {
	Name  string `json:"name"`
	Admin bool   `json:"admin"`
	jwt.RegisteredClaims
}

func (j *jwtAuth) NewJwtCustomClaims() *JwtCustomClaims {
	return new(JwtCustomClaims)
}

func (j *jwtAuth) CreateToken(claims *JwtCustomClaims, expires time.Time) (string, error) {
	claims.ExpiresAt = jwt.NewNumericDate(expires)
	// claims := &JwtCustomClaims{
	// 	name,
	// 	admin,
	// 	jwt.RegisteredClaims{
	// 		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
	// 		Issuer:    "ezbiz.maejiccode",
	// 	},
	// }
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(j.config.Secret))
}
