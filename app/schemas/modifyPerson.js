const Joi = require('joi');

const modifyPersonSchema = Joi.object({
    nickname: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role_id: Joi.number().integer(),
});

module.exports = modifyPersonSchema;