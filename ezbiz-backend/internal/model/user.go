package model

type User struct {
	Id        int64  `json:"id" db:"id"`
	FirstName string `json:"firstName" db:"first_name"`
	LastName  string `json:"lastName" db:"last_name"`
	Email     string `json:"email" db:"email"`
	Password  string `json:"password" db:"password"`
	Role      string `json:"role" db:"role"`
	IsActive  bool   `json:"isActive" db:"is_active"`
	PageLimit int    `json:"pageLimit" db:"page_limit"`
	CreatedAt string `json:"createdAt" db:"created_at"`
	UpdatedAt string `json:"updatedAt" db:"updated_at"`
}
