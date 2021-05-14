const resources = [
	{ resource_name: "Internet", resource_description: "Online articles & tutorials" },
	{ resource_name: "Books", resource_description: "Language specific literature" },
	{ resource_name: "Mentors", resource_description: "Professionals or friends in the industry" },
];

exports.seed = function (knex) {
	return knex("resources").insert(resources);
};
