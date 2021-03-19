const { Router } = require("express");

const articleRouter = Router();

const articleController = require("../controllers/articleController");

const isAdmin = require("../middlewares/isAdmin");
const auth = require("../middlewares/auth");


const articleSchema = require("../schemas/article");
const modifyArticleSchema = require("../schemas/modifyArticle");

const { validateBody } = require("../services/validator");

// Article
articleRouter.get("/articles", articleController.getAllArticle);
articleRouter.get("/article/:id", articleController.getOneArticle);
articleRouter.post(
  "/article",
  auth,
  isAdmin,
  validateBody(articleSchema),
  articleController.newArticle
);
articleRouter.delete("/article/:id", auth, isAdmin, articleController.deleteArticle);
articleRouter.put(
  "/article/:id",  
  auth,
  isAdmin,
  validateBody(modifyArticleSchema),
  articleController.editArticle
);

module.exports = articleRouter;
