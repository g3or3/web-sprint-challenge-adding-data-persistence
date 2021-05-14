const express = require("express");
const server = express();

server.use(express.json());
server.use("/api/projects", require("./project/router"));
server.use("/api/resources", require("./resource/router"));
server.use("/api/tasks", require("./task/router"));

module.exports = server;
