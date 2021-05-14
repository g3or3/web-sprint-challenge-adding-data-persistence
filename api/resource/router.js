const Resources = require("./model");
const { verifyResourcePayload } = require("./middleware");
const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json(await Resources.getAllResources());
});

router.post("/", verifyResourcePayload, async (req, res) => {
	res.json(await Resources.createResource(req.body));
});

module.exports = router;
