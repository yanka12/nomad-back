-- requete d'insersion d'une personne
INSERT INTO person (nickname, email, password) VALUES ('gab', 'gabrielhongrois@gmail.com', 'js4life');

-- insertion d'un media
INSERT INTO person_media (person_id, media_id) VALUES ('1', '1');

-- Selection d'un profil avec jointure person/person_media/media
SELECT
        p.*,
        m.link
    FROM person AS p
    LEFT JOIN person_media AS pm
    ON p.id = pm.person_id
    LEFT JOIN media AS m
    ON m.id = pm.media_id
    WHERE p.id = $1;
, [id]);

-- Selection d'un article avec ses différentes tables de liaisons

SELECT
        a.*,
        m.link,
        c.id
    FROM article AS a
    LEFT JOIN article_media AS am
    ON a.id = am.article_id
    LEFT JOIN media AS m
    ON m.id = am.media_id
    LEFT JOIN category_article AS ca
    ON a.id = ca.article_id
    LEFT JOIN category AS c
    ON c.id = ca.category_id
    WHERE a.id = $1;