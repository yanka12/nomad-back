-- insertion de données dans person
-- ATTENTION ECRIRE LE SCRIPT DE DEPART AVANT DE LACER L'INSERTION
INSERT INTO "role" ("name") VALUES 
('admin'),
('nomad'),
('visiteur');

INSERT INTO person ("nickname","email","password") VALUES 
('Audrey', 'Reba16@gmail.com', 'Audy0714'),
('ARNOULD', 'Kiehn@yahoo.com', 'jean-francois-arnould'),
('Yunxi', 'Crawford53@hotmail.com', 'YunxiBZ'),
('Theo', 'Malvina_Wehner@hotmail.com', 'TheoB-png'),
('François', 'Larue52@gmail.com', 'FrancoisB75'),
('Diane', 'Marlene.Gislason16@hotmail.com', 'DianeDianeDiane'),
('Guillaume', 'Dock_Yost73@gmail.com', 'GuillaumeBB69'),
('Romain', 'Stella23@gmail.com', 'RomainBoudet'),
('Franck', 'Tracy_Kiehn11@yahoo.com', 'FranckCapon'),
('Ludivine', 'Junius.Hodkiewicz@yahoo.com', 'ludivineConstanti'),
('Wladimir', 'Katlynn_Beahan39@yahoo.com', 'Muggen30'),
('Boris', 'Dale7@hotmail.com', 'boris-couderc'),
('Anthony', 'Dakota.Homenick16@hotmail.com', 'mrz1880'),
('Stéphane', 'Kattie.Morissette@gmail.com', 'StephaneD94'),
('Jérôme', 'Aliyah_Boyer59@hotmail.com', 'LeJ84'); 


-- insertion de données dans person

INSERT INTO category ("name") VALUES 
('marcheur'),
('van'),
('bateau');



INSERT INTO article ("name","description","content") VALUES ('Haribo', 'ceci est la description de article haribo', 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de ...'), ('Ferrero Rocher', 'Ceci est un article sur les Ferrero Rocher', 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est ...'), ('Mon Cheri', 'Ceci est un article sur les chocolats Mon Cheri', 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le ...');

INSERT INTO media ("link") VALUES ('mipuzbozih'), ('lmjsscpcmkjqcomz'), ('pjzqdncozqnfù'), ('qmkjcnmkcjnmkcnj'), ('mkqjdncojznco'), ('qmkdijmkjn');

INSERT INTO category_article ("article_id", "category_id") VALUES ('1', '3'), ('2', '1'), ('3','2');

INSERT INTO person_media ("person_id", "media_id") VALUES ('1', '1'), ('2','2'), ('3','3'), ('4','4');

INSERT INTO comment ("content", "person_id", "article_id") VALUES ('Cet article est null!', 1, 1), ('Trop bon les Ferrero à quand les ferrero gratuits', '2', '2'), ('ouaw je suis bourré', '5', '3');