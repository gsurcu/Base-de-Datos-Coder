import { ProductosApi } from "../models/productos/productos.api.js";

const productos = new ProductosApi();

const listarProductosPorIdController = (req, res) => {
  const { id } = req.params;
  if (id) {
    console.log(id)
    const producto = productos.listarPorIdOTodo(id);
    return res.status(200).json(producto);
  }
  const producto = productos.listarPorIdOTodo();
  return res.status(200).json(producto);
};

const guardarProductoController = async (req, res) => {
  const { nombre, descripcion, precio, codigo, imagen, stock } = req.body || {};
  if (nombre && descripcion && precio && codigo && imagen && stock ) {
    const nuevoProducto = await productos.guardar( {nombre, descripcion, precio, codigo, imagen, stock} );
    console.log(nuevoProducto)
    return res.status(200).json(nuevoProducto);
  }
  return res.status(400).json({error: "Faltan datos"});
};

const actualizarProductoController = async (req, res) => {
  const { id } = req.params;
  const productoActualizado = await productos.actualizar(req.body, id);
  if (productoActualizado.error) return res.status(404).send(productoActualizado.error);
  return res.status(200).json(productoActualizado);
};

const eliminarProductoController = async (req, res) => {
  const { id } = req.params;
  const productoEliminado = await productos.eliminar(id);
  if (productoEliminado.error) return res.status(404).send(productoEliminado.error);
  return res.status(200).json(productoEliminado);
};

export {
  listarProductosPorIdController,
  guardarProductoController,
  actualizarProductoController,
  eliminarProductoController,
  productos
};