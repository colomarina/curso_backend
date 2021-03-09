import express from "express";
import router from "../routes/routes";


const app = express();
app.use(express.json())
// app.use('/api', requie)

// let productos = new Array<Producto>()
// const P = new Productos();
// let mensaje_error = new Errores('')


app.use('/api', router)

const port = 8080;
const server = app.listen(port,()=>{
    console.log(`El servidor se encuentra en el puerto: 8080`)
})
server.on("error", error => console.log(`Error en el servidor, ${error}`))