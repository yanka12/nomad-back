const Joi = require('joi');

const personLoginSchema = Joi.object({
    nickname: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
    role_id: Joi.number().integer(),
});

module.exports = personLoginSchema;