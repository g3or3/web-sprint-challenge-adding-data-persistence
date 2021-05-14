const db = require("../../data/dbConfig");

const getAllResources = async () => {
	const results = await db("resources");
	return results;
};

module.exports = { getAllResources };
