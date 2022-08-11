exports.up = async (knex) => {
  await knex.schema.createTable("filme", function (table) {
    table.increments("id").primary().unique();
    table.string("nome").notNullable();
    table.string("ano").notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("filme");
};

exports.config = { transaction: false };
