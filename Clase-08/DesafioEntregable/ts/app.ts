import express from "express";
import {Errores, Producto} from "./funciones"
const app = express();
app.use(express.json())

let productos = new Array<Producto>()
let mensaje_error = new Errores('')
// Listar en forma total (get) : '/api/productos' -> devuelve array de productos
app.get('/api/productos', (req,res) => {
    if (productos.length === 0) {
        mensaje_error.error = "no hay productos cargados";
        res.json(mensaje_error)
    }
    res.json(productos)
    
    
})
// Listar en forma individual (get) (por id): '/api/productos/:id' -> devuelve producto listado 
app.get('/api/productos/:id', (req,res) => {
    const id = req.params.id
    const producto = productos.find( prod => prod.id == id)
    if (!producto) {
        mensaje_error.error = "producto no encontrado";
        res.json(mensaje_error)
    }
    res.send(producto)
})
// Almacenar un producto (post) : '/api/productos' -> devuelve producto incorporado
app.post('/api/productos', (req,res) => {
    let id = productos.length + 1; 
    const { title, price, thumbnail } = req.body
    const producto:Producto = {
        id,
        title,
        price,
        thumbnail
    }
    productos.push(producto)
    res.json(producto)
})

const port = 8080;
// app.listen(puerto, () => {
//     console.log(`Servidor esuchando el puerto ${}`)
// })

const server = app.listen(port,()=>{
    console.log(`El servidor se encuentra en el puerto: 8080`)
})
server.on("error", error => console.log(`Error en el servidor, ${error}`))