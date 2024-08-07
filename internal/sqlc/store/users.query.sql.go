// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: users.query.sql

package store

import (
	"context"

	"github.com/google/uuid"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (
    name, 
    email, 
    password,
    role
) VALUES (
    $1, 
    $2, 
    $3,
    $4
) RETURNING id
`

type CreateUserParams struct {
	Name     string `db:"name" json:"name"`
	Email    string `db:"email" json:"email"`
	Password string `db:"password" json:"password"`
	Role     Role   `db:"role" json:"role"`
}

func (q *Queries) CreateUser(ctx context.Context, arg *CreateUserParams) (uuid.UUID, error) {
	row := q.db.QueryRow(ctx, createUser,
		arg.Name,
		arg.Email,
		arg.Password,
		arg.Role,
	)
	var id uuid.UUID
	err := row.Scan(&id)
	return id, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.Exec(ctx, deleteUser, id)
	return err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, name, email, password, role, is_active, is_verified, created_at, updated_at FROM users WHERE email = $1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	row := q.db.QueryRow(ctx, getUserByEmail, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Password,
		&i.Role,
		&i.IsActive,
		&i.IsVerified,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return &i, err
}

const getUserByID = `-- name: GetUserByID :one
SELECT id, name, email, password, role, is_active, is_verified, created_at, updated_at FROM users WHERE id = $1
`

func (q *Queries) GetUserByID(ctx context.Context, id uuid.UUID) (*User, error) {
	row := q.db.QueryRow(ctx, getUserByID, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Password,
		&i.Role,
		&i.IsActive,
		&i.IsVerified,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return &i, err
}

const getUsers = `-- name: GetUsers :many
SELECT id, name, email, password, role, is_active, is_verified, created_at, updated_at FROM users ORDER BY email ASC
`

func (q *Queries) GetUsers(ctx context.Context) ([]*User, error) {
	rows, err := q.db.Query(ctx, getUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []*User{}
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Email,
			&i.Password,
			&i.Role,
			&i.IsActive,
			&i.IsVerified,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, &i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUsersCount = `-- name: GetUsersCount :one
SELECT COUNT(*) FROM users
`

func (q *Queries) GetUsersCount(ctx context.Context) (int64, error) {
	row := q.db.QueryRow(ctx, getUsersCount)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const updateUser = `-- name: UpdateUser :exec
UPDATE users SET
    name = $2,
    email = $3,
    role = $4,
    is_active = $5,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
`

type UpdateUserParams struct {
	ID       uuid.UUID `db:"id" json:"id"`
	Name     string    `db:"name" json:"name"`
	Email    string    `db:"email" json:"email"`
	Role     Role      `db:"role" json:"role"`
	IsActive bool      `db:"is_active" json:"isActive"`
}

func (q *Queries) UpdateUser(ctx context.Context, arg *UpdateUserParams) error {
	_, err := q.db.Exec(ctx, updateUser,
		arg.ID,
		arg.Name,
		arg.Email,
		arg.Role,
		arg.IsActive,
	)
	return err
}

const updateUserPassword = `-- name: UpdateUserPassword :exec
UPDATE users SET
    password = $2,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
`

type UpdateUserPasswordParams struct {
	ID       uuid.UUID `db:"id" json:"id"`
	Password string    `db:"password" json:"password"`
}

func (q *Queries) UpdateUserPassword(ctx context.Context, arg *UpdateUserPasswordParams) error {
	_, err := q.db.Exec(ctx, updateUserPassword, arg.ID, arg.Password)
	return err
}

const updateUserVerification = `-- name: UpdateUserVerification :exec
UPDATE users SET
    is_verified = $2,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
`

type UpdateUserVerificationParams struct {
	ID         uuid.UUID `db:"id" json:"id"`
	IsVerified bool      `db:"is_verified" json:"isVerified"`
}

func (q *Queries) UpdateUserVerification(ctx context.Context, arg *UpdateUserVerificationParams) error {
	_, err := q.db.Exec(ctx, updateUserVerification, arg.ID, arg.IsVerified)
	return err
}
