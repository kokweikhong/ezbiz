package service

import (
	"database/sql"
	"encoding/json"
	"log/slog"
	"time"

	"github.com/google/uuid"
	"github.com/kokweikhong/ezbiz-backend/internal/db"
	"github.com/kokweikhong/ezbiz-backend/internal/model"
	"github.com/lib/pq"
)

type ContentService interface {
	GetContents() ([]*model.Content, error)
	GetContent(id int64) (*model.Content, error)
	CreateContent(content *model.Content) (int64, error)
	UpdateContent(content *model.Content) (*model.Content, error)
	DeleteContent(id int64) error
	GetContentByUrl(url string) (*model.Content, error)
	GetContentsByUserId(userId int64) ([]*model.Content, error)
	CreateDefaultContent(userId int64, url string) (int64, error)
}

type contentService struct {
	db *sql.DB
}

func NewContentService() ContentService {
	return &contentService{
		db: db.GetDB(),
	}
}

func (s *contentService) GetContents() ([]*model.Content, error) {
	contents := []*model.Content{}
	query := `SELECT
				id,
				user_id,
				url,
				background_image,
				theme_color,
				profile_picture,
				company_logo,
				display_name,
				business_tagline,
				contact_no,
				email_address,
				website,
				social_medias,
				location,
				content,
				gallery,
				is_active,
				expire_at,
				created_at,
				updated_at
			FROM contents`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing content query", "error", err)
		return nil, err
	}

	rows, err := stmt.Query()
	if err != nil {
		slog.Error("Error querying content", "error", err)
		return nil, err
	}

	for rows.Next() {
		content := new(model.Content)
		socialMediasJson := []byte{}
		err := rows.Scan(
			&content.Id,
			&content.UserId,
			&content.Url,
			&content.BackgroundImage,
			&content.ThemeColor,
			&content.ProfilePicture,
			&content.CompanyLogo,
			&content.DisplayName,
			&content.BusinessTagline,
			&content.ContactNo,
			&content.EmailAddress,
			&content.Website,
			// &content.SocialMedias,
			&socialMediasJson,
			&content.Location,
			&content.Content,
			pq.Array(&content.Gallery),
			&content.IsActive,
			&content.ExpireAt,
			&content.CreatedAt,
			&content.UpdatedAt,
		)
		if err != nil {
			slog.Error("Error scanning content", "error", err)
			return nil, err
		}

		if err := json.Unmarshal(socialMediasJson, &content.SocialMedias); err != nil {
			slog.Error("Error unmarshalling social medias", "error", err)
			return nil, err
		}

		contents = append(contents, content)
	}

	return contents, nil
}

func (s *contentService) GetContent(id int64) (*model.Content, error) {
	content := new(model.Content)
	query := `SELECT
				id,
				user_id,
				url,
				background_image,
				theme_color,
				profile_picture,
				company_logo,
				display_name,
				business_tagline,
				contact_no,
				email_address,
				website,
				social_medias,
				location,
				content,
				gallery,
				is_active,
				expire_at,
				created_at,
				updated_at
			FROM contents
			WHERE id = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing content query", "error", err)
		return nil, err
	}

	socialMediasJson := []byte{}

	err = stmt.QueryRow(id).Scan(
		&content.Id,
		&content.UserId,
		&content.Url,
		&content.BackgroundImage,
		&content.ThemeColor,
		&content.ProfilePicture,
		&content.CompanyLogo,
		&content.DisplayName,
		&content.BusinessTagline,
		&content.ContactNo,
		&content.EmailAddress,
		&content.Website,
		&socialMediasJson,
		&content.Location,
		&content.Content,
		pq.Array(&content.Gallery),
		&content.IsActive,
		&content.ExpireAt,
		&content.CreatedAt,
		&content.UpdatedAt,
	)
	if err != nil {
		slog.Error("Error scanning content", "error", err)
		return nil, err
	}

	if err := json.Unmarshal(socialMediasJson, &content.SocialMedias); err != nil {
		slog.Error("Error unmarshalling social medias", "error", err)
		return nil, err
	}

	return content, nil
}

func (s *contentService) CreateContent(content *model.Content) (int64, error) {
	query := `INSERT INTO contents (
                user_id,
				url,
				background_image,
				theme_color,
				profile_picture,
				company_logo,
				display_name,
				business_tagline,
				contact_no,
				email_address,
				website,
                social_medias,
				location,
				content,
				gallery,
				is_active,
				expire_at,
				created_at,
				updated_at
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
			RETURNING id`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing content query", "error", err)
		return -1, err
	}

	socialMediasJson, err := json.Marshal(content.SocialMedias)
	if err != nil {
		slog.Error("Error marshalling social medias", "error", err)
		return -1, err
	}

	if content.ExpireAt == "" {
		// format postgresql timestamp
		content.ExpireAt = time.Now().AddDate(1, 0, 0).Format("2006-01-02 15:04:05")
	}

	var pk int64

	err = stmt.QueryRow(
		content.UserId,
		content.Url,
		content.BackgroundImage,
		content.ThemeColor,
		content.ProfilePicture,
		content.CompanyLogo,
		content.DisplayName,
		content.BusinessTagline,
		content.ContactNo,
		content.EmailAddress,
		content.Website,
		// content.SocialMedias,
		socialMediasJson,
		content.Location,
		content.Content,
		pq.Array(content.Gallery),
		content.IsActive,
		content.ExpireAt,
		"now()",
		"now()",
	).Scan(&pk)
	if err != nil {
		slog.Error("Error scanning content", "error", err)
		return -1, err
	}

	slog.Info("Content created", "id", pk)

	return pk, nil
}

func (s *contentService) UpdateContent(content *model.Content) (*model.Content, error) {
	query := `UPDATE contents
			SET
				user_id = $1,
				background_image = $2,
				theme_color = $3,
				profile_picture = $4,
				company_logo = $5,
				display_name = $6,
				business_tagline = $7,
				contact_no = $8,
				email_address = $9,
				website = $10,
				social_medias = $11,
				location = $12,
				content = $13,
				gallery = $14,
				is_active = $15,
				expire_at = $16,
				updated_at = $17,
				url = $18
			WHERE id = $19`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing content query", "error", err)
		return nil, err
	}

	socialMediasJson, err := json.Marshal(content.SocialMedias)
	if err != nil {
		slog.Error("Error marshalling social medias", "error", err)
		return nil, err
	}

	_, err = stmt.Exec(
		content.UserId,
		content.BackgroundImage,
		content.ThemeColor,
		content.ProfilePicture,
		content.CompanyLogo,
		content.DisplayName,
		content.BusinessTagline,
		content.ContactNo,
		content.EmailAddress,
		content.Website,
		socialMediasJson,
		content.Location,
		content.Content,
		pq.Array(content.Gallery),
		content.IsActive,
		content.ExpireAt,
		"now()",
		content.Url,
		content.Id,
	)
	if err != nil {
		slog.Error("Error updating content", "error", err)
		return nil, err
	}

	return content, nil
}

func (s *contentService) DeleteContent(id int64) error {
	query := `DELETE FROM contents WHERE id = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing content query", "error", err)
		return err
	}

	_, err = stmt.Exec(id)
	if err != nil {
		slog.Error("Error deleting content", "error", err)
		return err
	}

	return nil
}

func (s *contentService) GetContentByUrl(url string) (*model.Content, error) {
    content := new(model.Content)
	query := `SELECT
				id,
				user_id,
				url,
				background_image,
				theme_color,
				profile_picture,
				company_logo,
				display_name,
				business_tagline,
				contact_no,
				email_address,
				website,
				social_medias,
				location,
				content,
				gallery,
				is_active,
				expire_at,
				created_at,
				updated_at
			FROM contents
			WHERE url = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing content query", "error", err)
		return nil, err
	}

    socialMediasJson := []byte{}

	err = stmt.QueryRow(url).Scan(
        &content.Id,
        &content.UserId,
        &content.Url,
        &content.BackgroundImage,
        &content.ThemeColor,
        &content.ProfilePicture,
        &content.CompanyLogo,
        &content.DisplayName,
        &content.BusinessTagline,
        &content.ContactNo,
        &content.EmailAddress,
        &content.Website,
        &socialMediasJson,
        &content.Location,
        &content.Content,
        pq.Array(&content.Gallery),
        &content.IsActive,
        &content.ExpireAt,
        &content.CreatedAt,
        &content.UpdatedAt,
    )
    if err != nil {
        slog.Error("Error scanning content", "error", err)
        return nil, err
    }

    if err := json.Unmarshal(socialMediasJson, &content.SocialMedias); err != nil {
        slog.Error("Error unmarshalling social medias", "error", err)
        return nil, err
    }

    return content, nil
}

func (s *contentService) GetContentsByUserId(userId int64) ([]*model.Content, error) {
	contents := []*model.Content{}
	query := `SELECT
                id,
                user_id,
                url,
                background_image,
                theme_color,
                profile_picture,
                company_logo,
                display_name,
                business_tagline,
                contact_no,
                email_address,
                website,
                social_medias,
                location,
                content,
                gallery,
                is_active,
                expire_at,
                created_at,
                updated_at
            FROM contents
            WHERE user_id = $1`

	stmt, err := s.db.Prepare(query)
	if err != nil {
		slog.Error("Error preparing content query", "error", err)
		return nil, err
	}

	rows, err := stmt.Query(userId)
	if err != nil {
		slog.Error("Error querying content", "error", err)
		return nil, err
	}

	for rows.Next() {
		content := new(model.Content)
		socialMediasJson := []byte{}
		err := rows.Scan(
			&content.Id,
			&content.UserId,
			&content.Url,
			&content.BackgroundImage,
			&content.ThemeColor,
			&content.ProfilePicture,
			&content.CompanyLogo,
			&content.DisplayName,
			&content.BusinessTagline,
			&content.ContactNo,
			&content.EmailAddress,
			&content.Website,
			// &content.SocialMedias,
			&socialMediasJson,
			&content.Location,
			&content.Content,
			pq.Array(&content.Gallery),
			&content.IsActive,
			&content.ExpireAt,
			&content.CreatedAt,
			&content.UpdatedAt,
		)
		if err != nil {
			slog.Error("Error scanning content", "error", err)
			return nil, err
		}

		if err := json.Unmarshal(socialMediasJson, &content.SocialMedias); err != nil {
			slog.Error("Error unmarshalling social medias", "error", err)
			return nil, err
		}

		contents = append(contents, content)
	}

	return contents, nil
}

func (s *contentService) CreateDefaultContent(userId int64, url string) (int64, error) {
	if url == "" {
		// generate new uuid
		uuid, err := uuid.NewRandom()
		if err != nil {
			slog.Error("Error generating uuid", "error", err)
			return -1, err
		}
		url = uuid.String()
	}

	content := &model.Content{
		UserId:          userId,
		ThemeColor:      "#048c81",
		Url:             url,
		DisplayName:     "Your Name",
		BusinessTagline: "Your Tagline",
		ContactNo:       "60123456789",
		EmailAddress:    "unknown@unknown.com",
		Website:         "https://unknown.com",
		Location:        "Unknown",
		Content:         "<p>Content</p>",
		Gallery:         []string{"", "", "", "", "", "", "", "", "", ""},
		IsActive:        true,
	}

	return s.CreateContent(content)
}
