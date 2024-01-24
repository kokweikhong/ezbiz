package service

import (
	"database/sql"
	"log/slog"
	"strings"

	"github.com/kokweikhong/ezbiz-backend/internal/db"
	"github.com/kokweikhong/ezbiz-backend/internal/model"
)

type SocialService interface {
	GetSocials() ([]*model.Social, error)
	GetSocial(id int64) (*model.Social, error)
	CreateSocial(social *model.Social) (int64, error)
	UpdateSocial(social *model.Social) error
	DeleteSocial(id int64) error
}

type socialService struct {
	db *sql.DB
}

func NewSocialService() SocialService {
	return &socialService{
		db: db.GetDB(),
	}
}

func (s *socialService) GetSocials() ([]*model.Social, error) {
	socials := []*model.Social{}

	query := `SELECT id, name, url, image_path, placeholder, created_at, updated_at FROM socials`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing statement", "error", err)
		return nil, err
	}

	// commit and rollback
	rows, err := stmt.Query()
	if err != nil {
		slog.Error("Error querying statement", "error", err)
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		social := new(model.Social)
		err := rows.Scan(
			&social.Id,
			&social.Name,
			&social.Url,
			&social.ImagePath,
			&social.Placeholder,
			&social.CreatedAt,
			&social.UpdatedAt,
		)
		if err != nil {
			slog.Error("Error scanning rows", "error", err)
			return nil, err
		}
		socials = append(socials, social)
	}

	if err = rows.Err(); err != nil {
		slog.Error("Error iterating rows", "error", err)
		return nil, err
	}

	return socials, nil
}

func (s *socialService) GetSocial(id int64) (*model.Social, error) {
	social := new(model.Social)

	query := `SELECT id, name, url, image_path, placeholder, created_at, updated_at FROM socials WHERE id = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing statement", "error", err)
		return nil, err
	}

	rows, err := stmt.Query(id)
	if err != nil {
		slog.Error("Error querying statement", "error", err)
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(
			&social.Id,
			&social.Name,
			&social.Url,
			&social.ImagePath,
			&social.Placeholder,
			&social.CreatedAt,
			&social.UpdatedAt,
		)
		if err != nil {
			slog.Error("Error scanning rows", "error", err)
			return nil, err
		}
	}

	if err = rows.Err(); err != nil {
		slog.Error("Error iterating rows", "error", err)
		return nil, err
	}

	return social, nil
}

func (s *socialService) CreateSocial(social *model.Social) (int64, error) {
	query := `INSERT INTO socials 
				(name, url, image_path, placeholder, created_at, updated_at) 
			  VALUES 
				($1, $2, $3, $4, $5, $6)
			  RETURNING id`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing statement", "error", err)
		return -1, err
	}

	social.Name = strings.ToLower(social.Name)

	var pk int64
	err = stmt.QueryRow(
		social.Name,
		social.Url,
		social.ImagePath,
		social.Placeholder,
		"NOW()",
		"NOW()",
	).Scan(&pk)
	if err != nil {
		slog.Error("Error executing statement", "error", err)
		return -1, err
	}

	slog.Info("Created social", "id", pk)

	return pk, nil
}

func (s *socialService) UpdateSocial(social *model.Social) error {
	query := `UPDATE socials SET name = $1, url = $2, image_path = $3, placeholder = $4, updated_at = $5 WHERE id = $6`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing statement", "error", err)
		return err
	}

	social.Name = strings.ToLower(social.Name)

	_, err = stmt.Exec(
		social.Name,
		social.Url,
		social.ImagePath,
		social.Placeholder,
		"NOW()",
		social.Id,
	)
	if err != nil {
		slog.Error("Error executing statement", "error", err)
		return err
	}

	return nil
}

func (s *socialService) DeleteSocial(id int64) error {
	query := `DELETE FROM socials WHERE id = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing statement", "error", err)
		return err
	}

	_, err = stmt.Exec(id)
	if err != nil {
		slog.Error("Error executing statement", "error", err)
		return err
	}

	return nil
}
