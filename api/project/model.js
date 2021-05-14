const db = require("../../data/dbConfig");

const getAllProjects = async () => {
	const results = await db("projects");

	return results.map((proj) => {
		proj.project_completed = proj.project_completed === 0 ? false : true;

		return proj;
	});
};

const getProjectById = async (project_id) => {
	const result = await db("projects").where({ project_id }).first();

	if (!result) return Promise.reject(null);

	return result;
};

const createProject = async (project) => {
	const [project_id] = await db("projects").insert(project);

	const result = await db("projects").where({ project_id }).first();
	result.project_completed = result.project_completed === 0 ? false : true;

	return result;
};

const removeProject = async (project_id) => {
	const removedProject = await db("projects").where({ project_id }).first();
	await db("projects").where({ project_id }).del();

	return removedProject;
};

module.exports = { getAllProjects, getProjectById, createProject, removeProject };
