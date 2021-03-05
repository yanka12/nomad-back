-- Revert nomad:init from pg

BEGIN;

DROP TABLE have, article_media, person_media, "role", category_article, comment, media, category, article, person;

COMMIT;
