const db = require("../../data/dbConfig");

const getAllTasks = async () => {
	const results = await db
		.select(
			"task_description",
			"task_notes",
			"task_completed",
			"t.project_id",
			"project_name",
			"project_description"
		)
		.from("tasks as t")
		.join("projects as p", "p.project_id", "t.project_id");

	if (!results.length) return null;

	return results.map((res) => {
		res.task_completed = res.task_completed === 0 ? false : true;

		return res;
	});
};

const getTasksByProjectId = async (project_id) => {
	const results = await db("tasks").where({ project_id });

	if (!results.length) return null;

	return results;
};

const createTask = async (task) => {
	const [task_id] = await db("tasks").insert(task);

	const result = await db("tasks").where({ task_id }).first();
	result.task_completed = result.task_completed === 0 ? false : true;

	return result;
};

module.exports = { getAllTasks, getTasksByProjectId, createTask };
