const Joi = require("joi");

const taskSchema = Joi.object({
	task_description: Joi.string().trim().required(),
	task_notes: Joi.string(),
	task_completed: Joi.boolean().falsy(0).truthy(1),
	project_id: Joi.number().integer().required(),
});

module.exports = taskSchema;
