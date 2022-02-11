import knex from './config.js'

export const insertItem = async (item) => {
  await knex('productos').insert(item);
  console.log(`Item ${item.name} fue insertado correctamente a la base de datos`)
}