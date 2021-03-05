-- Deploy digitalNomad:init to pg



-- Deploy nomad:init to pg
-- création des tables de base

BEGIN;

CREATE TABLE person (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
nickname VARCHAR(50) NOT NULL,
email VARCHAR(128) NOT NULL,
"password" text NOT NULL,
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
person_id int NOT NULL REFERENCES person(id),
article_id int NOT NULL REFERENCES article(id),
created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE category_article (
artcile_id int NOT NULL,
category_id int NOT NULL
);

CREATE TABLE "role" (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" int NOT NULL
);

CREATE TABLE person_media (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
person_id int NOT NULL REFERENCES person(id),
media_id int NOT NULL REFERENCES media(id)
);

CREATE TABLE article_media (
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
article_id int NOT NULL REFERENCES article(id),
media_id int NOT NULL REFERENCES media(id)
);

CREATE TABLE have  (
category_id int NOT NULL
);

COMMIT;


