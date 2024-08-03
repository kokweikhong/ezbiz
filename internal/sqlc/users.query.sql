-- name: GetUsers :many
SELECT * FROM users ORDER BY email ASC;

-- name: GetUsersCount :one
SELECT COUNT(*) FROM users;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: GetUserByID :one
SELECT * FROM users WHERE id = $1;

-- name: CreateUser :one
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
) RETURNING id;

-- name: UpdateUser :exec
UPDATE users SET
    name = $2,
    email = $3,
    role = $4,
    is_active = $5,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1;

-- name: UpdateUserVerification :exec
UPDATE users SET
    is_verified = $2,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1;

-- name: UpdateUserPassword :exec
UPDATE users SET
    password = $2,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;
