### méthode getOneProfil

1) Front envoie un formulaire avec Media
2) back reçoit le formulaire
3) Création const data avec les infos formulaires
4) requête sql insert into pour créer la nouvelle personne dans la table person
5) if : si il y a un lien media dans le formulaire
   1) Processus de création d'un nouveau média dans la table = comme pour la table person, faire un insert into
   2) créer le lien dans la table de liaison
      1) récupérer l'id de la person crée ==> il est stocké dans le return iD
      2) récupérer l'id de la media crée ==> stocké dans le return iD
      3) Créer la ligne dans la table de liaison avec ces infos