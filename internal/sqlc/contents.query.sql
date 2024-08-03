-- name: GetContents :many
SELECT * FROM contents ORDER BY title ASC;

-- name: GetContentByURL :one
SELECT
  sqlc.embed(contents),
  sqlc.embed(socials),
  sqlc.embed(images)
FROM contents
  LEFT JOIN socials ON contents.id = socials.content_id
  LEFT JOIN images ON contents.id = images.content_id
WHERE contents.url = $1;

-- name: GetContentByID :one
SELECT * FROM contents WHERE id = $1;

-- name: CreateContent :one
INSERT INTO contents (
    user_id,
    title,
    url
) VALUES ($1, $2, $3) RETURNING id;

-- name: UpdateContent :exec
UPDATE contents SET 
  title = $2, 
  subtitle = $3, 
  url = $4, 
  color = $5,
  about = $6,
  favicon = $7,
  background_image = $8,
  profile_image = $9
WHERE id = $1;

-- name: DeleteContent :exec
DELETE FROM contents WHERE id = $1;

-- name: CreateSocial :one
INSERT INTO socials (
    content_id,
    phone_number,
    sms,
    email,
    whatsapp,
    facebook,
    instagram,
    messenger,
    website,
    location,
    google_maps,
    waze
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id;

-- name: UpdateSocial :exec
UPDATE socials SET
  phone_number = $2,
  sms = $3,
  email = $4,
  whatsapp = $5,
  facebook = $6,
  instagram = $7,
  messenger = $8,
  website = $9,
  location = $10,
  google_maps = $11,
  waze = $12
WHERE content_id = $1;

-- name: CreateImage :one
INSERT INTO images (content_id, url) VALUES ($1, $2) RETURNING id;

-- name: UpdateImage :exec
UPDATE images SET url = $2 WHERE content_id = $1;

-- name: DeleteImage :exec
DELETE FROM images WHERE content_id = $1;


