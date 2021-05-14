const tasks = [
	{
		task_description: "Find quality internet content",
		task_notes: "Procrastination kills",
		task_completed: true,
		project_id: 1,
	},
	{
		task_description: "Read for 30 minutes",
		task_notes: "Reading is still cool",
		task_completed: false,
		project_id: 2,
	},
	{
		task_description: "Schedule a one-on-one",
		project_id: 3,
	},
];

exports.seed = function (knex) {
	return knex("tasks").insert(tasks);
};
