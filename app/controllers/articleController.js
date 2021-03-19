const articleMapper = require("../dataMappers/articleMapper");
const Article = require("../models/article");

const articleController = {
  getAllArticle: async (request, response) => {
    const articles = await articleMapper.findAll();

    response.json(articles);
  },

  getOneArticle: async (request, response) => {
    const { id } = request.params;
    console.log("getOneArticleId", id);

    try {
      const article = await articleMapper.findOne(id);
      response.json(article);
    } catch (err) {
      response.status(404).json({"error":"Article not found"});
    }
  },

  newArticle: async (request, response) => {
    // on crée directement notre model à partir des données envoyées dans le payload
    const theArticle = new Article(request.body);

    console.log(request.body);

    try {
      // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
      await articleMapper.save(theArticle);
      // console.log(thePerson);
      response.json(theArticle);
    } catch (err) {
      response.status(403).json({"error":"Save failed"});
    }
  },

  deleteArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await articleMapper.findOne(id);
      await articleMapper.deleteArticle(id);
      res.status(200).json({
        ok: true,
        message: `l\'article ${id} a bien été supprimé`,
      });
    } catch (err) {
      console.trace(err);
      next(err);
    }
  },

  editArticle: async (req, res, next) => {
    const id = Number(req.params.id);

    let result = await articleMapper.findOne(id);

    const properties = ["name", "description", "content"];

    for (const prop in req.body) {
      if (properties.includes(prop)) {
        result[prop] = req.body[prop];
      }
    }
    try {
      // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
      const changeArticle = await articleMapper.updateArticle(result, id);

      res.json(changeArticle);
    } catch (err) {
      res.status(400).json({"error":"Update failed"});
    }
  },
};

module.exports = articleController;
