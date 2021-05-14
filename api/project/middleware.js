const projectSchema = require("./validation");

const verifyProjectPayload = async (req, res, next) => {
	try {
		req.body = await projectSchema.validateAsync(req.body, {
			stripUnknown: true,
		});
		next();
	} catch (err) {
		next({ status: 400, message: err.message });
	}
};

module.exports = { verifyProjectPayload };
