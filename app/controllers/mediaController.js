const mediaMapper = require('../models/mediaMapper');
const Media = require('../models/media');

const mediaController = {
getAllMedia: async (request, response) => {
    const medias = await mediaMapper.findAllMedia();
    response.json(medias);
},

getOneMedia: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const media = await mediaMapper.findOneMedia(id);
        // console.log(media);
    res.json(media);
    } catch (error) {
        res.json({"error":"pas de média avec l'id " + id});
    }
    
},

newMedia: async (request, response) => {
    // on crée directement notre model à partir des données envoyées dans le payload
    const theMedia = new Media(request.body);
    // console.log(request.body);

    // ici, thePost peut contenir l'une des 2 propriétés suivantes :
    // - un categoryId, l'id d'une ligne dans la table category
    // - une category, le libellé d'une ligne dans la table category
    console.log(request.body);

    try {
        // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
        await mediaMapper.save(theMedia);
        // console.log(thePerson);
        response.json(theMedia);
    } catch (err) {
        response.status(403).json(err.message);
    }
},

deleteMedia: async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await mediaMapper.findOneMedia(id);
        // TODO delete tous les medias créés par la personne
        // cherche les médias
        // on les delete
        await mediaMapper.deleteMedia(id);
        res.status(200).json ({
            ok: true,
            message: `Le media ${id} a bien été supprimé`
        })
    }
    catch(err) {
        console.trace(err)
        next(err);
    }
},

updateMedia: async (req, res, next) => {
    const id = Number(req.params.id);  
    
    let result = await mediaMapper.findOneMedia(id);

    const properties = ['link'];

    for (const prop in req.body) {
        if (properties.includes(prop)) {
            result[prop] = req.body[prop];
        }
    }
    try {
        // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
        const editMedia = await mediaMapper.updateMedia(result, id);

        res.json({"le media a bien été modifié": editMedia});
    } catch (err) {
        res.status(404).json({"error":"Echec de la modification"});
    }
}



};
module.exports = mediaController;