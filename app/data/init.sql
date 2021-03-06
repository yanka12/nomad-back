-- Deploy digitalNomad:init to pg





BEGIN;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS article CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS category_article CASCADE;
DROP TABLE IF EXISTS "role";
DROP TABLE IF EXISTS person_media CASCADE;
DROP TABLE IF EXISTS article_media CASCADE;
DROP TABLE IF EXISTS have;

CREATE TABLE "role" (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" VARCHAR(50)
);

CREATE TABLE person (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
nickname VARCHAR(50) NOT NULL,
email VARCHAR(128) NOT NULL UNIQUE,
"password" text NOT NULL,
role_id int REFERENCES "role"(id) DEFAULT 2,
created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE article (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" text NOT NULL,
"description" text,
content text NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE category (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" text NOT NULL
);

CREATE TABLE media (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
link text NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comment (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
content text NOT NULL,
person_id int NOT NULL REFERENCES person(id) ON DELETE CASCADE,
article_id int NOT NULL REFERENCES article(id) ON DELETE CASCADE,
created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE category_article (
article_id int NOT NULL REFERENCES article(id) ON DELETE CASCADE,
category_id int NOT NULL REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE person_media (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
person_id int NOT NULL REFERENCES person(id) ON DELETE CASCADE,
media_id int NOT NULL REFERENCES media(id) ON DELETE CASCADE
);

CREATE TABLE article_media (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
article_id int NOT NULL REFERENCES article(id) ON DELETE CASCADE,
media_id int NOT NULL REFERENCES media(id) ON DELETE CASCADE
);

CREATE TABLE have  (
category_id int NOT NULL
);

COMMIT;


