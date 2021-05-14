const projects = [
	{
		project_name: "Learn Front-End Development",
		project_description: "Web dev mastery",
		project_completed: true,
	},
	{
		project_name: "Learn Back-End Development",
		project_description: "Web dev mastery",
		project_completed: false,
	},
	{
		project_name: "Learn CS Fundamentals",
		project_description: "Web dev mastery",
	},
];

exports.seed = function (knex) {
	return knex("projects").insert(projects);
};
