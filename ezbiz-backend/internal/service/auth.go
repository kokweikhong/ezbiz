package service

import (
	"database/sql"
	"log/slog"

	"github.com/kokweikhong/ezbiz-backend/internal/db"
	"github.com/kokweikhong/ezbiz-backend/internal/model"
	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	Login(email, password string) (*model.User, error)
}

type authService struct {
	db *sql.DB
}

func NewAuthService() AuthService {
	return &authService{db: db.GetDB()}
}

func (s *authService) Login(email, password string) (*model.User, error) {
	user := new(model.User)

	query := `SELECT
				id,
				first_name,
				last_name,
				email,
				password,
				role,
				is_active,
				page_limit,
				created_at,
				updated_at
			FROM
				users
			WHERE
				email = $1`

	err := s.db.QueryRow(query, email).Scan(
		&user.Id,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.Role,
		&user.IsActive,
		&user.PageLimit,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		slog.Error("Error getting user", "error", err)
		return nil, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		slog.Error("Error comparing password", "error", err)
		return nil, err
	}

	// remove password from user object
	user.Password = "this is a secret"

	return user, nil
}
