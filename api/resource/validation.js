const Joi = require("joi");

const resourceSchema = Joi.object({
	resource_name: Joi.string().trim().required(),
	resource_description: Joi.string(),
});

module.exports = resourceSchema;
