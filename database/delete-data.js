import knex from './config.js'

export const deleteItem = async (id, tableName) => {
  await knex(tableName).where('id', id).delete()
}