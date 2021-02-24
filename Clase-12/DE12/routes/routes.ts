import { Router } from "express";
import {Errores, Producto, Productos} from "../ts/funciones"
let router = Router()

const P = new Productos();
let mensaje_error = new Errores('')

router.get('/productos_vista', (req,res) => {
    let lista;
    (P.productos.length === 0)?lista = false : lista=true ;
    res.render('pages/index', {
        productos: P.productos,
        listaTieneElementos: lista
    })
})

// Listar en forma total (get) : '/api/productos' -> devuelve array de productos
router.get('/productos', (req,res) => {
    if (P.productos.length === 0) {
        mensaje_error.error = "no hay productos cargados";
        res.json(mensaje_error)
    }
    res.json(P.productos)   
})
// Listar en forma individual (get) (por id): '/api/productos/:id' -> devuelve producto listado 
router.get('/productos/:id', (req,res) => {
    const existe = P.buscar(req.params.id)
    if (!existe) {
        mensaje_error.error = "producto no encontrado";
        res.json(mensaje_error)
    }
    res.json(existe)
})
// Almacenar un producto (post) : '/api/productos' -> devuelve producto incorporado
router.post('/productos', (req,res) => {
    
    if ((req.body.title === '') || (req.body.price === '') || (req.body.thumbnail === '')) {
        // alert('Error: Debe rellenar todos los campos...')
        mensaje_error.error = "Error: Debe rellenar todos los campos...";
        res.json(mensaje_error)
    } else {
        const { title, price, thumbnail } = req.body
        const producto = new Producto(P.productos.length,title,+price,thumbnail);
        P.agregar(producto)            
        res.redirect('/api/productos_vista')
        // res.json(producto)
    }
})
// Actualizar un producto (put) : '/api/productos/actualizar/:id' -> devuelve producto actualizado
router.patch('/productos/:id', (req,res) => {
    // busco por si no existe , ya muestro error
    const prod_actualizar = P.buscar(req.params.id)
    if (!prod_actualizar) {
        mensaje_error.error = "producto no encontrado, no se puede actualizar";
        res.json(mensaje_error)
    }
    const id = req.params.id  
    const { title , price , thumbnail } = req.body
    const productoActualizar = new Producto(0,title,price,thumbnail);
    // Creo producto con un id x , para despues forzarle el id correcto y lo pueda encontrar
    productoActualizar.id = +id;
    let productoYaActualizado = P.actualizar(productoActualizar)
    res.json(productoYaActualizado)
})
// Borrar un producto (delete) : '/api/productos/borrar/:id' -> devuelve producto eliminado
router.delete('/productos/:id', (req,res) => {
    const prod_eliminar = P.buscar(req.params.id)
    if (!prod_eliminar) {
        mensaje_error.error = "producto no encontrado, no se puede eliminar";
        res.json(mensaje_error)
    }
    P.eliminar(req.params.id)
    res.json(prod_eliminar)
})



export default router ;

