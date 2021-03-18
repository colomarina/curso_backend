import { Router } from "express";
import {knex_mysql, knex_sqlite3, listaProductos, mensaje_error, usuario} from "./constantes";
import {v4 as uuidv4} from "uuid";
import { Producto } from "./objetos";
import { traerProductos_2 } from "../DB/index.db";

let routerProductos = Router();

// Rutas para Productos

routerProductos.get('/productos', (req,res)=>{
    
    traerProductos_2()
      .then((rows: any) => {
        console.log(rows[0])
        // res.json(rows);
        res.render('pages/index')
      })
      .catch((error: any) => {
        mensaje_error.error = error.errno;
        mensaje_error.descripcion = "No hay productos cargados";
        console.log(error);
        res.json(mensaje_error)
      })
      .finally(() => {
        knex_sqlite3.destroy();
      });
    // if (listaProductos.listar().length === 0) {
    //     mensaje_error.error = "1";
    //     mensaje_error.descripcion = "No hay productos cargados";
    //     res.json(mensaje_error)
    // }
    // res.json(listaProductos.listar())

})
routerProductos.get('/productos/:producto_id', (req,res)=>{
    // Listar 1 producto x su id
    const existe_producto = listaProductos.buscar(req.params.producto_id)
    if (!existe_producto) {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Producto no encontrado";
        res.json(mensaje_error)
    }
    res.json(existe_producto)
})
routerProductos.post('/productos', (req,res)=>{
    //Agregar un producto al listado
    // console.log(req.body.nombre)
    if (usuario.administrador) { 
        if ((req.body.nombre === undefined) || (req.body.descripcion === undefined) || (req.body.codigo === undefined) || (req.body.foto === undefined) || (req.body.stock === undefined)) {
            mensaje_error.error = "1";
            mensaje_error.descripcion = "Debe rellenar todos los campos...";
            res.json(mensaje_error)
        } else {
            const { nombre, descripcion, codigo, foto, stock } = req.body
            let id = uuidv4();
            const producto = new Producto(id,nombre,descripcion,+codigo, foto, +stock);
            listaProductos.agregar(producto)
            res.json(producto)
        }
    } else {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
        res.json(mensaje_error)
    }
})
routerProductos.patch('/productos/:producto_id', (req,res)=>{
    // Actualiza un producto por su id
    if (usuario.administrador) { 
        const produ_actualizar = listaProductos.buscar(req.params.producto_id)
        if (!produ_actualizar) {
            mensaje_error.error = "1";
            mensaje_error.descripcion = "Producto no encontrado, no se puede actualizar";
            res.json(mensaje_error)
        }
        const id = req.params.producto_id
        const { nombre, descripcion, codigo, foto, stock } = req.body
        const productoActualizar = new Producto(id,nombre,descripcion,+codigo, foto, +stock);
        let productoYaActualizado = listaProductos.actualizar(productoActualizar)
        res.json(productoYaActualizado)
    } else {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
        res.json(mensaje_error)
    }
})
routerProductos.delete('/productos/:producto_id', (req,res)=>{
    // Elimina un producto por su id
    if (usuario.administrador) { 
        const produ_eliminar = listaProductos.buscar(req.params.producto_id)
        if (!produ_eliminar) {
            mensaje_error.error = "1";
            mensaje_error.descripcion = "Producto no encontrado, no se puede eliminar";
            res.json(mensaje_error)
        }
        listaProductos.eliminar(req.params.producto_id)
        res.json(produ_eliminar)
    } else {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
        res.json(mensaje_error)
    }
})

export default routerProductos ;

