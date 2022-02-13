import { configMariaDB } from "../../database/config.js";
import knex from "knex";

export class ProductosApi {
  constructor(tableName) {
    this.knex = knex(configMariaDB);
    this.tableName = tableName;
    this.open()
  }

  open() {
    this.knex.schema.hasTable(this.tableName).then((exists) => {
      if (!exists) {
        this.knex.schema
          .createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("title");
            table.integer("price");
            table.string("imageURL");
          })
          .then(() => {
            console.log("Tabla creada");
          })
          .catch((err) => console.log(err));
      }
    });
  }

  async listarPorIdOTodo(id) {
    try {
      if (id) {
        const result = await this.knex.from(this.tableName).select("*").where("id", id);
        if (result.length === 0) {
          return null;
        }
        return result;
      }
      const result = await this.knex.from(this.tableName).select("*");
      return result;
    } catch (error) {
      console.log(error.message);
    }
  };

  async guardar(prod) {
    try {
      await this.knex(this.tableName).insert(prod);
    } catch (error) {
      console.log(error.message);
    }
  };

  async actualizar(prod, id) {
    try {
      await this.knex(this.tableName).where("id", id).update(prod);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  async eliminar(id) {
    try {
      await this.knex(this.tableName).where("id", id).del();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
