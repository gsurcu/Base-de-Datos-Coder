import { ProductosApi } from "../models/productos/productos.api.js";

const productosApi = new ProductosApi("productos");

const listarProductosPorIdController = async (req, res) => {
  const { id } = req.params;
  if (id) {
    console.log(id)
    const producto = await productosApi.listarPorIdOTodo(id);
    return res.status(200).json(producto);
  }
  const producto = await productosApi.listarPorIdOTodo();
  return res.status(200).json(producto);
};

const guardarProductoController = async (req, res) => {
  const {title, price, thumbnail} = req.body;
  
  if (title && price && thumbnail) {
    const nuevoProducto = await productosApi.guardar({title, price,imageURL: thumbnail} );
    return res.status(200).redirect("/");
  }

  return res.status(400).send("Faltan datos");
};

const actualizarProductoController = async (req, res) => {
  const { id } = req.params;
  const {title, price, thumbnail} = req.body;
  
  if (title && price && thumbnail) {
    const productoActualizado = await productosApi.actualizar({title, price, thumbnail}, id);
    if (productoActualizado) {
      return res.status(200).send("Producto actualizado");
    }
    return res.status(404).send("Producto no encontrado");
  }

  return res.status(400).send("Faltan datos");
};

const eliminarProductoController = async (req, res) => {
  const { id } = req.params;
  
  if (id) {
    const productoEliminado = await productosApi.eliminar(id);
    if (productoEliminado) {
      return res.status(200).json({mensaje: "Producto eliminado"});
    }
    return res.status(404).json({mensaje: "Producto no encontrado"});
  }
};

export {
  listarProductosPorIdController,
  guardarProductoController,
  actualizarProductoController,
  eliminarProductoController,
  productosApi
};