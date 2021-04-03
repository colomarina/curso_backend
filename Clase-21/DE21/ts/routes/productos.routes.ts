import { Router } from "express";
const productosController = require('../Controller/productos.controller')

let routerProductos = Router();

// Rutas para Productos
// /productos
routerProductos.get("/productos", productosController.getAll);
routerProductos.post("/productos", productosController.create);
// /productos/:producto_id
routerProductos.get("/productos/:producto_id", productosController.getOne);
routerProductos.put("/productos/:producto_id", productosController.update);
routerProductos.delete("/productos/:producto_id", productosController.delete);
// /productos_vista/?nombre=Agua
// /productos_vista/?min_precio=1000&max_precio=3000
routerProductos.get("/productos_vista", productosController.getWithFilters);



export default routerProductos;