const Joi = require('joi');

const articleSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .required(),
    description: Joi.string(),
    content: Joi.string()
        .min(10)
        .required(),

});

module.exports = articleSchema;