import knex from "knex";

export const dropTable = async (tableName) => {
  const hasTable = await knex.schema.hasTable(tableName);
  if (hasTable) {
    await knex.schema.dropTable(tableName);
    console.log(`La tabla ${tableName} fue eliminada exitosamente`)
  }
}