const Projects = require("./model");
const projectSchema = require("./validation");

const verifyProjectId = async (req, res, next) => {
	try {
		req.project = await Projects.getProjectById(req.params.id);
		next();
	} catch (err) {
		next({ status: 400, message: "Project Id is invalid." });
	}
};

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

module.exports = { verifyProjectId, verifyProjectPayload };
