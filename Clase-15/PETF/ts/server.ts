import express from "express";
import routerProductos from "./routes/productos"
import routerCarritos from "./routes/carritos"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', routerProductos)
app.use('/api', routerCarritos)

const port = 8080;
const server = app.listen(port,()=>{
    console.log(`El servidor se encuentra en el puerto: 8080`)
})
server.on("error", error => console.log(`Error en el servidor, ${error}`))