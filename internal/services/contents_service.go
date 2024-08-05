package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/kokweikhong/ezbiz/internal/sqlc/store"
)

type ContentsService interface {
	GetContentById(ctx context.Context, id uuid.UUID) (*store.Content, error)
	CreateContent(ctx context.Context, arg *store.CreateContentParams) (string, error)
	UpdateContent(ctx context.Context, arg *store.UpdateContentParams) error
}

type contentsService struct {
	db *pgxpool.Pool
}

func NewContentsService(db *pgxpool.Pool) ContentsService {
	return &contentsService{
		db: db,
	}
}

func (s *contentsService) GetContentById(ctx context.Context, id uuid.UUID) (*store.Content, error) {
	q := store.New(s.db)
	return q.GetContentByID(ctx, id)
}

func (s *contentsService) CreateContent(ctx context.Context, arg *store.CreateContentParams) (string, error) {
	q := store.New(s.db)
	id, err := q.CreateContent(ctx, arg)
	if err != nil {
		return "", err
	}
	_, err = q.CreateSocial(ctx, &store.CreateSocialParams{})
	if err != nil {
		return "", err
	}

	return id.String(), nil
}

func (s *contentsService) UpdateContent(ctx context.Context, arg *store.UpdateContentParams) error {
	q := store.New(s.db)
	return q.UpdateContent(ctx, arg)
}
