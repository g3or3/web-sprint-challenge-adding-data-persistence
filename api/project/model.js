const db = require("../../data/dbConfig");

const getAllProjects = async () => {
	const results = await db("projects");

	return results.map((proj) => {
		proj.project_completed = proj.project_completed === 0 ? false : true;

		return proj;
	});
};

const getProjectById = (project_id) => {
	return db("projects").where({ project_id }).first();
};

const createProject = async (project) => {
	const [project_id] = await db("projects").insert(project);

	const result = await db("projects").where({ project_id }).first();
	result.project_completed = result.project_completed === 0 ? false : true;

	return result;
};

module.exports = { getAllProjects, getProjectById, createProject };
