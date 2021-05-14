const Tasks = require("./model");
const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json(await Tasks.getAllTasks());
});

router.post("/", async (req, res) => {
	res.json("testing");
});

module.exports = router;
