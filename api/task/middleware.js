const Projects = require("../project/model");
const taskSchema = require("./validation");

const verifyTaskPayload = async (req, res, next) => {
	try {
		req.body = await taskSchema.validateAsync(req.body, {
			stripUnknown: true,
		});
		try {
			await Projects.getProjectById(req.body.project_id);
			next();
		} catch (err) {
			next({ status: 400, message: "Project Id is invalid." });
		}
	} catch (err) {
		next({ status: 400, message: err.message });
	}
};

module.exports = { verifyTaskPayload };
