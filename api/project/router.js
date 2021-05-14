const Projects = require("./model");
const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json("testing");
});

router.post("/", async (req, res) => {
	res.json("testing");
});

module.exports = router;
