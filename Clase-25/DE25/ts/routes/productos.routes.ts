import { Router } from "express";
const productosController = require('../Controller/productos.controller')

let routerProductos = Router();

const auth = (req: any, res: any, next:any) => {
  if(req.session.user === 'colito'){
    return next();
  } else if(req.session.user){
    return next();
  } else {
    return res.redirect('/api/login')
  }
}

// Rutas para Productos
// /productos
routerProductos.get("/productos",auth, productosController.getAll);
routerProductos.post("/productos",auth, productosController.create);
// /productos/vista/?nombre=Agua
// /productos/vista/?min_precio=1000&max_precio=3000
routerProductos.get("/productos/vista",auth, productosController.getWithFilters);
// /productos/vista-test?cant=5
routerProductos.get("/productos/vista-test",auth, productosController.createRandom);
// /productos/:producto_id
routerProductos.get("/productos/:producto_id",auth, productosController.getOne);
routerProductos.put("/productos/:producto_id",auth, productosController.update);
routerProductos.delete("/productos/:producto_id",auth, productosController.delete);
// /desnormalizar
routerProductos.get("/desnormalizar",auth, productosController.getAllMensajes);



export default routerProductos;