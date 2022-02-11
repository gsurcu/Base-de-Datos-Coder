import { configMariaDB } from "../../database/config";
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
      const result = await this.knex.from(this.tableName).select("*").where("id", id);
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error.message);
    }
  };

  async guardar(prod) {
    const nuevoProducto = { ...prod, id: uuidv4(), timestamp: Date.now() };
    if (nuevoProducto) {
      this.productos.push(nuevoProducto);
      
      await fs.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
      return nuevoProducto;
    }
    return nuevoProducto
  };

  async actualizar(prod, id) {
    const indice = this.productos.findIndex(prod => prod.id === id);
    this.productos[indice] = { id: id, ...prod, timestamp: this.productos[indice].timestamp };

    await fs.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
    return this.productos[indice]
  };

  async eliminar(id) {
    const indice = this.productos.findIndex(prod => prod.id === id);
    this.productos.splice(indice, 1);
    
    await fs.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
    return
  }
}
