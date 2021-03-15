const Joi = require('joi');

const commentSchema = Joi.object({
    content: Joi.string()
    .min(1)
    .required(),
    person_id: Joi.number().integer(),
    article_id: Joi.number().integer(),
});

module.exports = commentSchema;