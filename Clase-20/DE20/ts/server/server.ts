import express from "express";
import mongoose from 'mongoose';
import routerProductos from "../routes/productos";
import routerCarritos from "../routes/carritos";
import path = require("path");
import { fechayhora } from "../routes/constantes";
import {
  agregarMensaje,
  agregarProducto,
  traerMensajes,
  traerProductos,
} from "../DB/index.db";

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/api", routerProductos);
app.use("/api", routerCarritos);

io.on("connection", (socket: any) => {
  console.log(socket.id);
  traerProductos()
    .then((productos: any) => {
      socket.emit("productos", productos);
    })
    .catch((error: any) => {
      console.log(error);
    });
  traerMensajes()
    .then((mensajes: any) => {
      mensajes.length === 0
        ? console.log("No hay mensajes en la DB")
        : socket.emit("mensajes", mensajes);
    })
    .catch((error: any) => {
      console.log(error);
    });
  socket.on("producto", (prod: any) => {
    agregarProducto(prod)
      .then(() => {
        traerProductos()
          .then((productos: any) => {
            io.emit("productos", productos);
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
  socket.on("mensaje", (messag: any) => {
    const { mail, message } = messag;
    const mensaje = { mail: mail, dateandhour: fechayhora(), message: message};
    agregarMensaje(mensaje)
      .then(() => {
        traerMensajes()
          .then((mensajes: any) => {
            // console.log(rows.length, "mensajes traer");
            mensajes.length === 0
              ? console.log("No hay mensajes")
              : io.emit("mensajes", mensajes);
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
});

const port = 8080;
const server = http.listen(port, () => {
  mongoose.connect('mongodb://localhost:27017/ecommerce',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => console.log('El servidor se encuentra en el puerto: 8080 y se conecto correctamente a la DB ecommerce'))
        .catch((err) => console.log(err));
});