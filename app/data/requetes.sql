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
`, [id]);
