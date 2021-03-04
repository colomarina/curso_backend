"use strict";

var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
// import path = require('path');
var path_1 = __importDefault(require("path"));
var funciones_1 = require("./funciones");
var funciones_files_1 = require("./funciones_files");
// RUTAS DE LAS PLANTILLAS 
// /api/agregar_producto  ---> agregar productos
// /api/productos_vista  ---> lista los productos (la ruta que dice la consigna (/productos/vista) me da errores , por que al poner /productos/vista , la palabra vista me la toma como parametro del get /productos/:id y eso me interfiere , por eso la modifique!)
var app = express_1.default();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var P = new funciones_1.Productos();
var M = new funciones_1.Mensajes();
var archivo = new funciones_files_1.File('registro_del_chat.txt');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Configuracion de EJS
// Establecemos el motor de plantilla que vamos a utilizar!
app.set('view engine', 'ejs');
// Establecemos el directorio donde se encuentran los archivos de plantillas
app.set('views', path_1.default.join(__dirname, '/views'));
// El agregar lo sincronice con esta plantilla , asi utilizaba ambos casos
// app.use('/api/agregar_producto',express.static('public'))
app.use('/api', routes_1.default);
io.on('connection', function (socket) {
    console.log(socket.id);
    socket.emit('productos', P);
    socket.emit('mensajes', M);
    socket.on('producto', function (prod) {
        var title = prod.title,
            price = prod.price,
            thumbnail = prod.thumbnail;
        var producto = new funciones_1.Producto(P.productos.length, title, +price, thumbnail);
        P.agregar(producto);
        // console.log(P)
        io.emit('productos', P);
    });
    socket.on('mensaje', function (messag) {
        var mail = messag.mail,
            message = messag.message;
        var mensaje = new funciones_1.Mensaje(mail, funciones_1.fechayhora(), message);
        M.agregar(mensaje);
        archivo.agregar(M);
        // console.log(M)
        io.emit('mensajes', M);
    });
    // socket.on('escribiendo', (valor: any) => {
    //     if (valor) {
    //         let user = `${socket.id} esta escribiendo...`;
    //         // Emite el mensaje para los demas
    //         socket.broadcast.emit('alguien esta escribiendo', user)
    //     }
    // })
});
var port = 8080;
http.listen(port, function () {
    console.log("El servidor se encuentra en el puerto: 8080");
});
