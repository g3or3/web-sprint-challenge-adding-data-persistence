const db = require("../../data/dbConfig");

const getAllProjects = async () => {
	const results = await db("projects");

	return results.map((proj) => {
		proj.project_completed = proj.project_completed === 0 ? false : true;

		return proj;
	});
};

const getProjectById = async (project_id) => {
	const results = await db("projects").where({ project_id }).first();

	if (!results) return Promise.reject(null);

	results.project_completed = results.project_completed === 0 ? false : true;

	return results;
};

const getProjectDetails = async (project_id) => {
	const results = await db("projects")
		.select(
			"project_name",
			"project_description",
			"project_completed",
			"t.*",
			"r.*",
			"quantity"
		)
		.from("projects as p")
		.join("tasks as t", "t.project_id", "p.project_id")
		.join("project_resources as pr", "pr.project_id", "p.project_id")
		.join("resources as r", "r.resource_id", "pr.resource_id")
		.where("p.project_id", parseInt(project_id));

	return results.reduce((acc, row) => {
		let { project_id, project_name, project_description, project_completed } = row;
		let { task_id, task_description, task_notes, task_completed } = row;
		let { resource_id, resource_name, resource_description, quantity } = row;

		task_completed = task_completed === 0 ? false : true;
		project_completed = project_completed === 0 ? false : true;

		if (!acc.tasks) {
			acc = {
				project_id,
				project_name,
				project_description,
				project_completed,
				tasks: [{ task_id, task_description, task_notes, task_completed }],
				resources: [{ resource_id, resource_name, resource_description, quantity }],
			};
		} else {
			acc.tasks.push({ task_id, task_description, task_notes, task_completed });
			acc.resources.push({ resource_id, resource_name, resource_description, quantity });
		}

		return acc;
	}, {});
};

const createProject = async (project) => {
	const [project_id] = await db("projects").insert(project);

	const results = await db("projects").where({ project_id }).first();
	results.project_completed = results.project_completed === 0 ? false : true;

	return results;
};

const updateProject = async (project_id, project) => {
	await db("projects").where({ project_id }).update(project);

	return getProjectById(project_id);
};

const removeProject = async (project_id) => {
	const removedProject = await db("projects").where({ project_id }).first();
	await db("projects").where({ project_id }).del();

	return removedProject;
};

module.exports = {
	getAllProjects,
	getProjectById,
	getProjectDetails,
	createProject,
	updateProject,
	removeProject,
};
