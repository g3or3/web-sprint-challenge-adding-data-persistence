const Projects = require("./model");
const { verifyProjectId, verifyProjectPayload } = require("./middleware");
const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json(await Projects.getAllProjects());
});

router.get("/:id", verifyProjectId, async (req, res) => {
	res.json(req.project);
});

router.post("/", verifyProjectPayload, async (req, res) => {
	res.json(await Projects.createProject(req.body));
});

router.delete("/:id", verifyProjectId, async (req, res) => {
	res.json(await Projects.removeProject(req.params.id));
});

module.exports = router;
