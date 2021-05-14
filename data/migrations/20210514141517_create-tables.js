exports.up = function (knex) {
	return knex.schema
		.createTable("projects", (tbl) => {
			tbl.increments("project_id");
			tbl.string("project_name").notNullable();
			tbl.text("project_description");
			tbl.boolean("project_completed").defaultTo(false);
		})
		.createTable("resources", (tbl) => {
			tbl.increments("resource_id");
			tbl.string("resource_name").notNullable().unique();
			tbl.text("resource_description");
		})
		.createTable("tasks", (tbl) => {
			tbl.increments("task_id");
			tbl.text("task_description").notNullable();
			tbl.text("task_notes");
			tbl.boolean("task_completed").defaultTo(false);
			tbl
				.integer("project_id")
				.unsigned()
				.notNullable()
				.references("project_id")
				.inTable("projects")
				.onDelete("RESTRICT");
		})
		.createTable("project_resources", (tbl) => {
			tbl.increments("assignment_id");
			tbl.integer("quantity").unsigned().notNullable();
			tbl
				.integer("resource_id")
				.unsigned()
				.notNullable()
				.references("resource_id")
				.inTable("resources");
			tbl
				.integer("project_id")
				.unsigned()
				.notNullable()
				.references("project_id")
				.inTable("projects");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("project_resources")
		.dropTableIfExists("tasks")
		.dropTableIfExists("resources")
		.dropTableIfExists("projects");
};
