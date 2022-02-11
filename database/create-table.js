import knex from './config.js'

export const createTable = async (tableName) => {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('price')
  });
  console.log(`La tabla ${tableName} fue creada exitosamente.`)
};