const express = require("express");
const server = express();

server.use(express.json());
server.use("/api/projects", require("./project/router"));
server.use("/api/resources", require("./resource/router"));
server.use("/api/tasks", require("./task/router"));

server.use((err, req, res, next) => {  //eslint-disable-line
	res.status(err.status || 500).json({
		note: "Something went wrong in the router",
		message: err.message,
	});
});

module.exports = server;
