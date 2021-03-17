const adminMapper = require('../dataMappers/adminMapper');
const personMapper = require('../dataMappers/personMapper');
const person = require('../models/person');



const adminController = {
getAdminInfo: async (req, res) => {

    console.log(req.session.user);
    if (!req.session.user || req.session.user.role_id !== 1) {
    return await res.status(403).json({"error":"you are not an admin"});
    }
    else {
    //     // ici le user a bien les droits
    return await res.status(200);
    }
}, 

updateInfo: async (req, res, next) => {
    const id = Number(req.params.id);  
    console.log("log de acontrollUpdateinfo", req.body);

    let result = await personMapper.findOne(id);

    const properties = ['nickname', 'email', 'password', 'role_id'];

    for (const prop in req.body) {
        if (properties.includes(prop)) {
            result[prop] = req.body[prop];
        }
    }
    try {
        // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
        const editPerson = await adminMapper.updatePerson(result, id);

        res.json(editPerson);
    } catch (err) {
        res.status(404).json({"error":"Echec de la modification"});
    }
}

};

module.exports = adminController;