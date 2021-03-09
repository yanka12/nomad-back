const { response } = require('express');
const personMapper = require('../models/personMapper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Person = require('../models/person');

const personController = {

getOnePerson: async (request, response) => {
    const { id } = request.params;
    console.log(id);

    try {
        const person = await personMapper.findOne(id);
        response.json(person);
        
        
    } catch (err) { // l'Error qu'on a throw dans le mapper est récupérée ici
        // et sa propriété message correspond à la string qu'on a passée en argument du constructeur
        response.status(404).json(err.message);
    }

},

newPerson: async (request, response) => {
    // on crée directement notre model à partir des données envoyées dans le payload
    const thePerson = new Person(request.body);
    // console.log(request.body);

    // ici, thePost peut contenir l'une des 2 propriétés suivantes :
    // - un categoryId, l'id d'une ligne dans la table category
    // - une category, le libellé d'une ligne dans la table category
    console.log(request.body);

    try {
        // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
        await personMapper.save(thePerson);
        // console.log(thePerson);
        response.json(thePerson);
    } catch (err) {
        response.status(403).json(err.message);
    }
},

getAllPerson: async (request, response) => {
    const persons = await personMapper.findAll();

    response.json(persons);
},

deleteUser: async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const user = await personMapper.findOne(id);
        console.log(user);
        // TODO delete tous les medias créés par la personne
        // cherche les médias
        // on les delete
        await personMapper.deleteUser(id);
        res.status(200).json ({
            ok: true,
            message: `${id} a bien été supprimé`
        })
    }
    catch(err) {
        console.trace(err)
        next(err);
    }
},

};

module.exports = personController;
