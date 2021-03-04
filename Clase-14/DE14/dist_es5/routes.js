"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var funciones_1 = require("../funciones");
var router = express_1.Router();
var P = new funciones_1.Productos();
var mensaje_error = new funciones_1.Errores('');
router.get('/productos_vista', function (req, res) {
    // let lista;
    // (P.productos.length === 0)?lista = false : lista=true ;
    res.render('pages/index', {
        productos: P.productos,
        // listaTieneElementos: lista
    });
});
// Listar en forma total (get) : '/api/productos' -> devuelve array de productos
router.get('/productos', function (req, res) {
    if (P.productos.length === 0) {
        mensaje_error.error = "no hay productos cargados";
        res.json(mensaje_error);
    }
    res.json(P.productos);
});
// Listar en forma individual (get) (por id): '/api/productos/:id' -> devuelve producto listado 
router.get('/productos/:id', function (req, res) {
    var existe = P.buscar(req.params.id);
    if (!existe) {
        mensaje_error.error = "producto no encontrado";
        res.json(mensaje_error);
    }
    res.json(existe);
});
// Almacenar un producto (post) : '/api/productos' -> devuelve producto incorporado
router.post('/productos', function (req, res) {
    if ((req.body.title === '') || (req.body.price === '') || (req.body.thumbnail === '')) {
        // alert('Error: Debe rellenar todos los campos...')
        mensaje_error.error = "Error: Debe rellenar todos los campos...";
        res.json(mensaje_error);
    }
    else {
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
        var producto = new funciones_1.Producto(P.productos.length, title, +price, thumbnail);
        P.agregar(producto);
        // res.redirect('/api/productos_vista')
        // res.json(producto)
        res.sendStatus(200);
    }
});
// Actualizar un producto (put) : '/api/productos/actualizar/:id' -> devuelve producto actualizado
router.patch('/productos/:id', function (req, res) {
    // busco por si no existe , ya muestro error
    var prod_actualizar = P.buscar(req.params.id);
    if (!prod_actualizar) {
        mensaje_error.error = "producto no encontrado, no se puede actualizar";
        res.json(mensaje_error);
    }
    var id = req.params.id;
    var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
    var productoActualizar = new funciones_1.Producto(0, title, price, thumbnail);
    // Creo producto con un id x , para despues forzarle el id correcto y lo pueda encontrar
    productoActualizar.id = +id;
    var productoYaActualizado = P.actualizar(productoActualizar);
    res.json(productoYaActualizado);
});
// Borrar un producto (delete) : '/api/productos/borrar/:id' -> devuelve producto eliminado
router.delete('/productos/:id', function (req, res) {
    var prod_eliminar = P.buscar(req.params.id);
    if (!prod_eliminar) {
        mensaje_error.error = "producto no encontrado, no se puede eliminar";
        res.json(mensaje_error);
    }
    P.eliminar(req.params.id);
    res.json(prod_eliminar);
});
exports.default = router;
