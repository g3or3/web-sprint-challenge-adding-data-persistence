const db = require("../../data/dbConfig");

const getAllResources = () => {
	return db("resources");
};

const getResourceById = (resource_id) => {
	return db("resources").where({ resource_id }).first();
};

const getResourceByName = (resource_name) => {
	return db("resources").where("resource_name", "like", resource_name).first();
};

const getResourcesByProject = ({ project_id, project_name }) => {
	const searchBy = project_id ? { "p.project_id": project_id } : { project_name };

	return db
		.select("r.*", "quantity")
		.from("resources as r")
		.join("project_resources as pr", "pr.resource_id", "r.resource_id")
		.join("projects as p", "p.project_id", "pr.project_id")
		.where(searchBy);
};

const createResource = async (resource) => {
	const [resource_id] = await db("resources").insert(resource);

	return db("resources").where({ resource_id }).first();
};

const updateResource = async ({ resource_name, resource_id }, resource) => {
	const updateBy = resource_name ? { resource_name } : { resource_id };

	await db("resources").where(updateBy).update(resource);

	return resource_name
		? getResourceByName(resource.resource_name)
		: getResourceById(resource_id);
};

const removeResource = async ({ resource_name, resource_id }) => {
	const removeBy = resource_name ? { resource_name } : { resource_id };

	const removedResource = await db("resources").where(removeBy).first();
	await db("resources").where(removeBy).del();

	return removedResource;
};

module.exports = {
	getAllResources,
	getResourceById,
	getResourceByName,
	getResourcesByProject,
	createResource,
	updateResource,
	removeResource,
};
