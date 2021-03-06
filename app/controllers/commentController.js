const commentMapper = require('../dataMappers/commentMapper');
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
        response.status(404).json({"error":"Not found"});
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

    console.log(request.body);

    try {
        await commentMapper.save(theComment);
        // console.log(thePerson);
        response.json(theComment);
    } catch (err) {
        response.status(403).json({"error":"Save comment failed"});
    }
},

deleteComment: async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await commentMapper.findOne(id);
    
        await commentMapper.deleteComment(id);
        res.status(200).json ({
            ok: true,
            message: `the comment with ${id} has been deleted successfuly`
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
        const editComment = await commentMapper.updateComment(result, id);

        res.json(editComment);
    } catch (err) {
        res.status(400).json({"error":"Update comment failed"});
    }
}

};
module.exports = commentController;