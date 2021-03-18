const Joi = require('joi');

const modifyCommentSchema = Joi.object({
    content: Joi.string()
    .min(1),
    person_id: Joi.number().integer(),
    article_id: Joi.number().integer(),
});

module.exports = modifyCommentSchema;