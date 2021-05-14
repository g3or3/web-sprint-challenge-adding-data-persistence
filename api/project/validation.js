const Joi = require("joi");

const projectSchema = Joi.object({
	project_name: Joi.string().trim().required(),
	project_description: Joi.string().trim().allow(null),
	project_completed: Joi.boolean().falsy(0).truthy(1),
});

module.exports = projectSchema;
