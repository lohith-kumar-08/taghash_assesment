
exports.up = function (knex) {
    return knex.schema.createTable('vote', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.boolean('voting_choice');
        table.timestamp('casted_at').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('vote');
};
