const Resources = require("./model");
const resourceSchema = require("./validation");

const verifyResourceExists = async (req, res, next) => {
	if (req.params.id) {
		if (await Resources.getResourceById(req.params.id)) {
			return next();
		}
	} else if (req.query.resource) {
		if (await Resources.getResourceByName(req.query.resource)) {
			return next();
		}
	}
	return next({ status: 404, message: "Resource does not exist." });
};

const verifyResourcePayload = async (req, res, next) => {
	try {
		req.body = await resourceSchema.validateAsync(req.body, {
			stripUnknown: true,
		});
		if (await Resources.getResourceByName(req.body.resource_name)) {
			next({ status: 400, message: "Resource name must be unique." });
		} else {
			next();
		}
	} catch (err) {
		next({ status: 400, message: err.message });
	}
};

module.exports = { verifyResourceExists, verifyResourcePayload };
