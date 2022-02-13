import { configSQLite3 } from "../../database/config.js";
import knex from "knex";

export class ChatApi {
  constructor(tableName) {
    this.knex = knex(configSQLite3);
    this.tableName = tableName;
    this.open();
  }

  open() {
    this.knex.schema.hasTable(this.tableName).then((exists) => {
      if (!exists) {
        this.knex.schema
          .createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("anio");
            table.string("email");
            table.integer("hora");
            table.string("mensaje");
          })
          .then(() => {
            console.log("Tabla creada");
          })
          .catch((err) => console.log(err));
      }
    });
  }
  async addMessage(message) {
    try {
      const result = await this.knex(this.tableName).insert(message);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getMessage() {
    try {
      const result = await this.knex.from(this.tableName).select("*");
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
}
