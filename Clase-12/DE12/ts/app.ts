import express from "express";
import router from "../routes/routes";
import path = require('path');
import { Producto, Productos } from "./funciones";

// RUTAS DE LAS PLANTILLAS 
// /api/agregar_producto  ---> agregar productos
// /api/productos_vista  ---> lista los productos (la ruta que dice la consigna (/productos/vista) me da errores , por que al poner /productos/vista , la palabra vista me la toma como parametro del get /productos/:id y eso me interfiere , por eso la modifique!)

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const P = new Productos();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
// Configuracion de EJS
// Establecemos el motor de plantilla que vamos a utilizar!
app.set('view engine', 'ejs');
// Establecemos el directorio donde se encuentran los archivos de plantillas
app.set('views',path.join(__dirname, '/views'))

// El agregar lo sincronice con esta plantilla , asi utilizaba ambos casos
app.use('/api/agregar_producto',express.static('public'))
app.use('/api', router)

io.on('connection', (socket: any) => {
    // console.log(socket.id);
    socket.emit('productos', P)

    socket.on('producto', (prod: any) => {

        const { title , price, thumbnail } = prod;

        const producto = new Producto(P.productos.length,title,+price,thumbnail);

        P.agregar(producto)

        // console.log(P)

        io.emit('productos', P)
    })
})

const port = 8080;
http.listen(port,()=>{
   console.log(`El servidor se encuentra en el puerto: 8080`)    
})