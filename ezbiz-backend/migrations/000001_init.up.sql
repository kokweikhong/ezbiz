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
(1, 'facebook', '', '', 'https://www.facebook.com/'),
(2, 'twitter', '', '', 'https://twitter.com/'),
(3, 'instagram', '', '', 'https://www.instagram.com/'),
(4, 'linkedin', '', '', 'https://www.linkedin.com/'),
(5, 'youtube', '', '', 'https://www.youtube.com/'),
(6, 'tiktok', '', '', 'https://www.tiktok.com/'),
(7, 'pinterest', '', '', 'https://www.pinterest.com/'),
(8, 'snapchat', '', '', 'https://www.snapchat.com/'),
(9, 'tumblr', '', '', 'https://www.tumblr.com/'),
(10, 'reddit', '', '', 'https://www.reddit.com/'),
(11, 'whatsapp', '', '', 'https://www.whatsapp.com/'),
(12, 'telegram', '', '', 'https://telegram.org/'),
(13, 'line', '', '', 'https://line.me/'),
(14, 'wechat', '', '', 'https://www.wechat.com/'),
(15, 'viber', '', '', 'https://www.viber.com/'),
(16, 'skype', '', '', 'https://www.skype.com/'),
{17, 'waze', '', '', 'https://www.waze.com/'
ON CONFLICT DO NOTHING;

-- set next id for socials
SELECT setval('socials_id_seq', (SELECT MAX(id) FROM socials));

