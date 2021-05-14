const Projects = require("./model");
const { verifyProjectPayload } = require("./middleware");
const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json(await Projects.getAllProjects());
});

router.post("/", verifyProjectPayload, async (req, res) => {
	res.json(await Projects.createProject(req.body));
});

module.exports = router;
