import knex from './config.js'

export const selectWhere = async (tableName) => {
  const result = await knex.from(tableName)
    .select('id', 'nombre', 'apellido')
    .where('nombre', 'Gay')
}