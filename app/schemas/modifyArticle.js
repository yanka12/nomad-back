const Joi = require('joi');

const modifyArticleSchema = Joi.object({
    name: Joi.string()
    .min(3),
    description: Joi.string(),
    content: Joi.string()
        .min(10),

});

module.exports = modifyArticleSchema;