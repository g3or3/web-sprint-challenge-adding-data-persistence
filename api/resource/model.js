const db = require("../../data/dbConfig");

const getAllResources = () => {
	return db("resources");
};

const getResourceByName = (resource_name) => {
	return db("resources").where({ resource_name }).first();
};

const createResource = async (resource) => {
	const [resource_id] = await db("resources").insert(resource);

	return db("resources").where({ resource_id }).first();
};

module.exports = { getAllResources, getResourceByName, createResource };
