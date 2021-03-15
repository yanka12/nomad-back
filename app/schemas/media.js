const Joi = require('joi');

const mediaSchema = Joi.object({
    link: Joi.string()
        .min(3)
});

module.exports = mediaSchema;