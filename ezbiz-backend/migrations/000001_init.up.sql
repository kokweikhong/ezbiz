CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL DEFAULT '',
    last_name VARCHAR(255) NOT NULL DEFAULT '',
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL DEFAULT '',
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    page_limit INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "socials" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "url" VARCHAR(255) NOT NULL DEFAULT '',
    "image_path" VARCHAR(255) NOT NULL DEFAULT '',
    "placeholder" VARCHAR(255) NOT NULL DEFAULT '',
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "contents" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL UNIQUE DEFAULT '',
    "background_image" VARCHAR(255) NOT NULL DEFAULT '',
    "theme_color" VARCHAR(255) NOT NULL DEFAULT '',
    "profile_picture" VARCHAR(255) NOT NULL DEFAULT '',
    "company_logo" VARCHAR(255) NOT NULL DEFAULT '',
    "display_name" VARCHAR(255) NOT NULL DEFAULT '',
    "business_tagline" VARCHAR(255) NOT NULL DEFAULT '',
    "contact_no" VARCHAR(255) NOT NULL DEFAULT '',
    "email_address" VARCHAR(255) NOT NULL DEFAULT '',
    "website" VARCHAR(255) NOT NULL DEFAULT '',
    "social_medias" JSONB NOT NULL DEFAULT '{}',
    "location" VARCHAR(255) NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT[] NOT NULL DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
    "expire_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "contents" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- generate socials with url empty and image_path empty
INSERT INTO "socials" ("id", "name", "url", "image_path", "placeholder") VALUES
(1, 'website', '', 'uploads/socials/website.svg', 'https://www.yourwebsite.com/'),
(2, 'facebook', '', 'uploads/socials/facebook.svg', 'https://www.facebook.com/'),
(3, 'twitter', '', '', 'https://twitter.com/'),
(4, 'instagram', '', 'uploads/socials/instagram.svg', 'https://www.instagram.com/'),
(5, 'linkedin', '', '', 'https://www.linkedin.com/'),
(6, 'youtube', '', '', 'https://www.youtube.com/'),
(7, 'tiktok', '', '', 'https://www.tiktok.com/'),
(8, 'pinterest', '', '', 'https://www.pinterest.com/'),
(9, 'snapchat', '', '', 'https://www.snapchat.com/'),
(10, 'tumblr', '', '', 'https://www.tumblr.com/'),
(11, 'reddit', '', '', 'https://www.reddit.com/'),
(12, 'whatsapp', '', 'uploads/socials/facebook.svg', 'https://www.whatsapp.com/'),
(13, 'telegram', '', '', 'https://telegram.org/'),
(14, 'line', '', '', 'https://line.me/'),
(15, 'wechat', '', '', 'https://www.wechat.com/'),
(16, 'viber', '', '', 'https://www.viber.com/'),
(17, 'skype', '', '', 'https://www.skype.com/'),
(18, 'telephone', '', 'uploads/socials/telephone.svg', '6016xxxxxxxx'),
(19, 'sms', '', 'uploads/socials/sms.svg', '6016xxxxxxxx'),
(19, 'messenger', '', 'uploads/socials/messenger.svg', 'https://www.messenger.com/'),
(20, 'location', '', 'uploads/socials/location.svg', 'https://maps.google.com'),
(21, 'waze', '', 'uploads/socials/waze.svg', 'https://www.waze.com/')
ON CONFLICT DO NOTHING;

-- set next id for socials
SELECT setval('socials_id_seq', (SELECT MAX(id) FROM socials));
