const Resources = require("./model");
const resourceSchema = require("./validation");

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

module.exports = { verifyResourcePayload };
