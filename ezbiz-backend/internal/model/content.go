package model

type Content struct {
	Id              int64     `json:"id" db:"id"`
	UserId          int64     `json:"userId" db:"user_id"`
	Url             string    `json:"url" db:"url"`
	BackgroundImage string    `json:"backgroundImage" db:"background_image"`
	ThemeColor      string    `json:"themeColor" db:"theme_color"`
	ProfilePicture  string    `json:"profilePicture" db:"profile_picture"`
	CompanyLogo     string    `json:"companyLogo" db:"company_logo"`
	DisplayName     string    `json:"displayName" db:"display_name"`
	BusinessTagline string    `json:"businessTagline" db:"business_tagline"`
	ContactNo       string    `json:"contactNo" db:"contact_no"`
	EmailAddress    string    `json:"emailAddress" db:"email_address"`
	Website         string    `json:"website" db:"website"`
	SocialMedias    []*Social `json:"socialMedias" db:"social_medias"`
	Location        string    `json:"location" db:"location"`
	Content         string    `json:"content" db:"content"`
	Gallery         []string  `json:"gallery" db:"gallery"`
	IsActive        bool      `json:"isActive" db:"is_active"`
	ExpireAt        string    `json:"expireAt" db:"expire_at"`
	CreatedAt       string    `json:"createdAt" db:"created_at"`
	UpdatedAt       string    `json:"updatedAt" db:"updated_at"`
}
