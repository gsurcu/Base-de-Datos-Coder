import configMariaDB from './config.js'
import knex from 'knex';
const Knex = knex(configMariaDB)

export const createTable = async (tableName) => {
  await Knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('price')
  });
  console.log(`La tabla ${tableName} fue creada exitosamente.`)
};