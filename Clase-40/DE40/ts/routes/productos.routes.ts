import { Router } from "express";
const productosController = require('../controller/productos.controller')

let routerProductos = Router();

// Rutas para Productos
routerProductos.get("/productos", productosController.getAll);
// POST
routerProductos.post("/productos",productosController.create);
// /productos/:producto_id
routerProductos.get("/productos/:producto_id", productosController.getOne);
routerProductos.put("/productos/:producto_id", productosController.update);
routerProductos.delete("/productos/:producto_id", productosController.delete);

// /productos/vista/?nombre=Agua
// /productos/vista/?min_precio=1000&max_precio=3000
// routerProductos.get("/productos/vista", productosController.getWithFilters);
// /productos/vista-test?cant=5
// routerProductos.get("/productos/vista-test", productosController.createRandom);


export default routerProductos;