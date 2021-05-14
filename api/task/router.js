const Tasks = require("./model");
const { verifyTaskPayload } = require("./middleware");
const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json(await Tasks.getAllTasks());
});

router.post("/", verifyTaskPayload, async (req, res) => {
	res.json(await Tasks.createTask(req.body));
});

module.exports = router;
