package service

import (
	"database/sql"
	"log/slog"

	"github.com/kokweikhong/ezbiz-backend/internal/db"
	"github.com/kokweikhong/ezbiz-backend/internal/model"
	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	GetUsers() ([]*model.User, error)
	GetUser(id int64) (*model.User, error)
	CreateUser(user *model.User) (int64, error)
	UpdateUser(user *model.User) (*model.User, error)
	DeleteUser(id int64) error
	ChangePassword(email, oldPassword, newPassword string) error
}

type userService struct {
	db *sql.DB
}

func NewUserService() UserService {
	return &userService{
		db: db.GetDB(),
	}
}

func (s *userService) GetUsers() ([]*model.User, error) {
	users := []*model.User{}
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
			FROM users`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing user query", "error", err)
		return nil, err
	}

	rows, err := stmt.Query()
	if err != nil {
		slog.Error("Error querying users", "error", err)
		return nil, err
	}

	for rows.Next() {
		user := new(model.User)
		err := rows.Scan(
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
			slog.Error("Error scanning user row", "error", err)
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		slog.Error("Error iterating over user rows", "error", err)
		return nil, err
	}

	return users, nil
}

func (s *userService) GetUser(id int64) (*model.User, error) {
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
			FROM users
			WHERE id = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing user query", "error", err)
		return nil, err
	}

	err = stmt.QueryRow(id).Scan(
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
		slog.Error("Error scanning user row", "error", err)
		return nil, err
	}

	return user, nil
}

func (s *userService) CreateUser(user *model.User) (int64, error) {
	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		slog.Error("Error hashing user password", "error", err)
		return -1, err
	}
	user.Password = string(password)

	query := `INSERT INTO users (
				first_name,
				last_name,
				email,
				password,
				role,
				is_active,
				page_limit,
				created_at,
				updated_at
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing user query", "error", err)
		return -1, err
	}

    var pk int64

    err = stmt.QueryRow(
        user.FirstName,
        user.LastName,
        user.Email,
        user.Password,
        user.Role,
        user.IsActive,
		user.PageLimit,
        "now()",
        "now()",
    ).Scan(&pk)
    if err != nil {
        slog.Error("Error scanning user row", "error", err)
        return -1, err
    }

    slog.Info("User created", "id", pk)

	return pk, nil
}

func (s *userService) UpdateUser(user *model.User) (*model.User, error) {
	query := `UPDATE users SET
				first_name = $1,
				last_name = $2,
				email = $3,
				password = $4,
				role = $5,
				is_active = $6,
				page_limit = $7,
				updated_at = $8
			WHERE id = $9`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing user query", "error", err)
		return nil, err
	}

	_, err = stmt.Exec(
		user.FirstName,
		user.LastName,
		user.Email,
		user.Password,
		user.Role,
		user.IsActive,
		user.PageLimit,
        "now()",
		user.Id,
	)
	if err != nil {
		slog.Error("Error executing user query", "error", err)
		return nil, err
	}

	return user, nil
}

func (s *userService) DeleteUser(id int64) error {
	query := `DELETE FROM users WHERE id = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing user query", "error", err)
		return err
	}

	_, err = stmt.Exec(id)
	if err != nil {
		slog.Error("Error executing user query", "error", err)
		return err
	}

	return nil
}

func(s *userService) ChangePassword(email, oldPassword, newPassword string) error {
	user, err := s.GetUserByEmail(email)
	if err != nil {
		slog.Error("Error getting user by email", "error", err)
		return err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(oldPassword))
	if err != nil {
		slog.Error("Error comparing password", "error", err)
		return err
	}

	password, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		slog.Error("Error hashing user password", "error", err)
		return err
	}

	user.Password = string(password)

	_, err = s.UpdateUser(user)
	if err != nil {
		slog.Error("Error updating user", "error", err)
		return err
	}

	slog.Info("Password changed", "email", email)

	return nil
}

func (s *userService) GetUserByEmail(email string) (*model.User, error) {
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
			FROM users
			WHERE email = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing user query", "error", err)
		return nil, err
	}

	err = stmt.QueryRow(email).Scan(
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
		slog.Error("Error scanning user row", "error", err)
		return nil, err
	}

	return user, nil
}
