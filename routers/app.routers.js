import express from 'express';
import rutasProductos from './productos/productos.routes.js';
import { ProductosApi } from '../models/productos/productos.api.js';

const router = express.Router();
const productos = new ProductosApi("productos")
const listaProductos = productos.listarPorIdOTodo()
// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rutas
router.get('/', (req, res) => {
  res.render('index', {
    listaProductos,
  });
});
router.use('/api/productos', rutasProductos);
router.use('*', (req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `La ruta ${req.baseUrl} con el metodo ${req.method} no esta implementado`,
  });
});

export {router};