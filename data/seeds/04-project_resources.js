const assignments = [
	{ quantity: 1, resource_id: "1", project_id: "1" },
	{ quantity: 2, resource_id: "2", project_id: "2" },
	{ quantity: 3, resource_id: "3", project_id: "3" },
];

exports.seed = function (knex) {
	return knex("project_resources").insert(assignments);
};
