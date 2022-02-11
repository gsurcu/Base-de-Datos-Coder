import knex from './config.js'

export const selectFrom = async (tableName) => {
  const result = await knex.from(tableName).select('id','name','price')
}