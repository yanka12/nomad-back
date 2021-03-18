const { response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const personMapper = require('../dataMappers/personMapper');
const Person = require('../models/person');



const authController = {
// méthode de singIn
SubmitSignupForm: async (req, res) => {
try {
    // on crée un tableau d'erreurs qu'on viendra remplir si un des tests
    // qu'on va faire ne passe pas
    const errors = [];

    // on teste si la valeur de firstname n'est pas une chaine de carctère vide
    if (req.body.nickname.length === 0) {
        errors.push('Le prénom doit être renseigné')
    }

    // on teste si la valeur de lastname n'est pas une chaine de carctère vide
    if (req.body.email.length === 0) {
        errors.push('Le nom doit être renseigné')
    }

    // grâce à email-validator on vient vérifier que notre email est bien
    // valide
    const isValidEmail = emailValidator.validate(req.body.email);

    if (!isValidEmail) {
        errors.push('Vous devez renseigné un email valide');
    }

    // vérifier que le mot de passe soit assez long © Maher
    if (req.body.password.length < 6) {
        errors.push('le mot de passe doit avoir au minimum 6 caractères');
    }

    // vérifier que le mdp soit égal à la confirmation
    // if (req.body.password !== req.body.passwordConfirm) {
    //     errors.push('Le mot de passe et la confirmation doivent être identiques')
    // }

    // si on a des erreurs, on rend la vue avec les erreurs
    if (errors.length) {
        res.json('signup', {errors});
    }
    else {
        // sinon on va chercher en bdd si on a un utilisateur avec le même email
        // const person = await personMapper.findOneByEmail(req.body.email)
        
        // si on trouve un user, on affiche une erreur
        // if (person) {
        // errors.push('Email déjà pris');
        // res.json('signup', {errors});
        // }
        // else {
        // à partir d'ici on peut ajouter notre nouvel utilisateur
        // problème, on a le mot de passe en clair
        // NE JAMAIS METTRE LES MOTS DE PASSE EN CLAIR DANS UNE BDD
        // on va se servir d'un package qui va chiffrer ou hasher le
        // mot de passe de l'utilisateur
        // Une fois chiffré/hashé on ne peut pas revenir en arrière
        // on  hange la fonction avec celle asynchrone, ainsi on parallèlise
        // le calcul du hash, une fois qu'on l'a on passe à la suite du code
        const hashedPassword = await bcrypt.hash(req.body.password, 6);
        // on crée une nouvelle instance de User avec les data de post
        // ici on a pas besoin de mettre await devant le new User()
        // tout se passe en local et en synchrone, on a le modèle dans le dossier
        // '../models/' et sequelize dans les node_modules => pas d'appels à la bdd
        const newPerson = new Person({
            nickname: req.body.nickname,
            email: req.body.email,
            password: hashedPassword,
        });

        // on sauvegarde le nouvel utilisateur
        await personMapper.save(newPerson);

        // et quand c'est fait on le redirige vers la page d'accueil
        res.status(201).json({message:'Utilisateur créé avec succes'});
    }
    
} catch (error) {
    
    console.trace(error);
    res.json({error:error.message})
}
},

submitLoginForm: async (req, res) => {
try {
    const errors = [];

    // on vérifie que l'utilisateur a bien rempli les champs
    if (req.body.email.length === 0 || req.body.password.length === 0) {
    errors.push('Veuillez remplir tous les champs');
    }

    // vérifier que l'email existe en BDD => User
    // comparer le password du form avec le hash de ka BDD
    // si c'est pas bon lui donner un message d'erreur
    // si c'est bon le connecter
    // persistance de la connexion => session
    // si on a des erreurs on rend la vue avec ces erreurs
    // if (errors.length) {
    //     res.json({error:error.message})
    // }
    // sinon on chercher l'utilisateur en BDD
    const user = await personMapper.findOneByEmail(req.body.email);
    // à partir d'ici, si on a un utilisateur, on le redirige sur la page d'accueil
    // si le user est null on redirige sur la page d'inscription 
    if (!user) {
        errors.push('Veuillez vérifier vos identifiants');
        res.json({error:error.message})
    }
    else {
        // si on a trouvé un utilisateur, il va falloir comparer le mdp
        // des données en post avec le hash de la BDD
        // pour faire ça bcrypt propose une fonction compareSync
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        
        // si le password est valide on va le redirier sur la page d'accueil et stocker ses infos => session
        // on va pouvoir masquer les liens du menu "se connecter" et "s'inscrire",
        // afficher son nom et le lien déconnecter
        if (isValidPassword) {
        // on stocke les infos du user en session
        delete user.password;
        // et on le redirige
        res.status(200).json({
            user,
            token: jwt.sign({   
                userId: user.id,
                userRole_id: user.role_id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            }),
        });        
            console.log(user);
        }
        else {
        errors.push('Veuillez vérifier vos identifiants');
        res.status(401).json({"error":"invalid connection information"});
    }
    }

} catch (error) {
        console.trace(error);
    }
},

};

module.exports = authController;
