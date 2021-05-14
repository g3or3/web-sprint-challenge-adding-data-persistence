const Resources = require("./model");
const { verifyResourcePayload, verifyResourceExists } = require("./middleware");
const router = require("express").Router();

router.get("/", async (req, res) => {
	if (!req.query.project) {
		res.json(await Resources.getAllResources());
	} else {
		const isId = parseInt(req.query.project);
		if (isId) {
			res.json(await Resources.getResourcesByProject({ project_id: isId }));
		} else {
			res.json(
				await Resources.getResourcesByProject({ project_name: req.query.project })
			);
		}
	}
});

router.get("/:id", verifyResourceExists, async (req, res) => {
	res.json(await Resources.getResourceById(req.params.id));
});

router.post("/", verifyResourcePayload, async (req, res) => {
	res.json(await Resources.createResource(req.body));
});

router.put("/", verifyResourceExists, verifyResourcePayload, async (req, res) => {
	res.json(
		await Resources.updateResource({ resource_name: req.query.resource }, req.body)
	);
});

router.put("/:id", verifyResourceExists, verifyResourcePayload, async (req, res) => {
	res.json(await Resources.updateResource({ resource_id: req.params.id }, req.body));
});

router.delete("/", verifyResourceExists, async (req, res) => {
	res.json(await Resources.removeResource({ resource_name: req.query.resource }));
});

router.delete("/:id", verifyResourceExists, async (req, res) => {
	res.json(await Resources.removeResource({ resource_id: req.params.id }));
});

module.exports = router;
