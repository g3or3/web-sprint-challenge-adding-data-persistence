const Resources = require("./model");
const { verifyResourcePayload, verifyResourceExists } = require("./middleware");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
	if (!req.query.project) return res.json(await Resources.getAllResources());

	const isId = parseInt(req.query.project);
	const searchBy = isId ? { project_id: isId } : { project_name: req.query.project };

	const resources = await Resources.getResourcesByProject(searchBy);

	if (resources.length) res.json(resources);
	else next({ status: 400, message: "No resources with that project id." });
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
