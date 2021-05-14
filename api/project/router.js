const Projects = require("./model");
const { verifyProjectId, verifyProjectPayload } = require("./middleware");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
	if (!req.query.resource) return res.json(await Projects.getAllProjects());

	const projects = await Projects.getProjectsUsingResource(req.query.resource);

	if (projects.length) res.json(projects);
	else next({ status: 400, message: "No projects using that resource." });
});

router.get("/:id", verifyProjectId, async (req, res) => {
	res.json(req.project);
});

router.get("/:id/details", verifyProjectId, async (req, res) => {
	res.json(await Projects.getProjectDetails(req.params.id));
});

router.post("/", verifyProjectPayload, async (req, res) => {
	res.json(await Projects.createProject(req.body));
});

router.put("/:id", verifyProjectId, verifyProjectPayload, async (req, res) => {
	res.json(await Projects.updateProject(req.params.id, req.body));
});

router.delete("/:id", verifyProjectId, async (req, res) => {
	res.json(await Projects.removeProject(req.params.id));
});

module.exports = router;
