const Joi = require('joi');

const personSchema = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role_id: Joi.number().integer(),
}).xor('role_id');

module.exports = personSchema;