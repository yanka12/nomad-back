const commentMapper = require('../models/commentMapper');
const Comment = require('../models/comment');

const commentController = {

getOneComment: async (request, response) => {
    const { id } = request.params;
    console.log(id);

    try {
        const comment = await commentMapper.findOne(id);
        response.json(comment);
        
        
    } catch (err) { // l'Error qu'on a throw dans le mapper est récupérée ici
        // et sa propriété message correspond à la string qu'on a passée en argument du constructeur
        response.status(404).json(err.message);
    }
    
},

getAllComment: async (request, response) => {
    const comments = await commentMapper.findAll();

    response.json(comments);
},

newComment: async (request, response) => {
    // on crée directement notre model à partir des données envoyées dans le payload
    const theComment = new Comment(request.body);
    // console.log(request.body);

    // ici, thePost peut contenir l'une des 2 propriétés suivantes :
    // - un categoryId, l'id d'une ligne dans la table category
    // - une category, le libellé d'une ligne dans la table category
    console.log(request.body);

    try {
        // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
        await commentMapper.save(theComment);
        // console.log(thePerson);
        response.json(theComment);
    } catch (err) {
        response.status(403).json(err.message);
    }
},

deleteComment: async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await commentMapper.findOne(id);
    
        await commentMapper.deleteComment(id);
        res.status(200).json ({
            ok: true,
            message: `Le commentaire ${id} a bien été supprimé`
        })
    }
    catch(err) {
        console.trace(err)
        next(err);
    }
},

updateComment: async (req, res, next) => {
    const id = Number(req.params.id);  
    
    let result = await commentMapper.findOne(id);

    const properties = ['content', 'person_id', 'article_id'];

    for (const prop in req.body) {
        if (properties.includes(prop)) {
            result[prop] = req.body[prop];
        }
    }
    try {
        // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
        const editComment = await commentMapper.updateComment(result, id);

        res.json(editComment);
    } catch (err) {
        res.status(404).json({"error": "recommence"});
    }
}

};
module.exports = commentController;