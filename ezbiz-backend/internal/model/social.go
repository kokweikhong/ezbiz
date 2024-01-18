package model

type Social struct {
	Id          int64  `json:"id" db:"id"`
	Name        string `json:"name" db:"name"`
	Url         string `json:"url" db:"url"`
	ImagePath   string `json:"imagePath" db:"image_path"`
	Placeholder string `json:"placeholder" db:"placeholder"`
	CreatedAt   string `json:"createdAt" db:"created_at"`
	UpdatedAt   string `json:"updatedAt" db:"updated_at"`
}
