import express from "express";
import routerProductos from "../routes/productos"
import routerCarritos from "../routes/carritos"
import path = require('path');
import { knex_sqlite3 } from "../routes/constantes";
import { traerMensajes , traerProductos_2 } from "../DB/index.db";

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, '/views'))
app.use('/api', routerProductos)
app.use('/api', routerCarritos)

io.on('connection', (socket: any) => {
    console.log(socket.id);
    traerProductos_2()
    .then((rows: any) => {
        console.log(rows);
    })
    .catch((error: any) => {
        console.log(error);
    })
    // socket.emit('mensajes', M)

    // socket.on('mensaje', (messag: any) => {
        
    //     const { mail , message } = messag

    //     const mensaje = new Mensaje( mail, fechayhora() , message );

    //     M.agregar(mensaje)

    //     archivo.agregar(M)

    //     io.emit('mensajes', M)
    // })
})



const port = 8080;
const server = http.listen(port,()=>{
    console.log(`El servidor se encuentra en el puerto: 8080`)
})