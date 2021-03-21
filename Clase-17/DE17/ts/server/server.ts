import express from "express";
import routerProductos from "../routes/productos";
import routerCarritos from "../routes/carritos";
import path = require("path");
import { v4 as uuidv4 } from "uuid";
import { fechayhora, knex_sqlite3, mensaje_error } from "../routes/constantes";
import {
  agregarMensaje,
  agregarProducto,
  traerMensajes,
  traerProductos,
} from "../DB/index.db";
import { Mensaje, Producto } from "../routes/objetos";

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
    .then((rows: any) => {
      socket.emit("productos", rows);
    })
    .catch((error: any) => {
      console.log(error);
    });
  traerMensajes()
    .then((rows: any) => {
      rows.length === 0
        ? console.log("No hay mensajes en la DB")
        : socket.emit("mensajes", rows);
    })
    .catch((error: any) => {
      console.log(error);
    });
  socket.on("producto", (prod: any) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = prod;
    let id = uuidv4();
    const producto = new Producto(
      id,
      nombre,
      descripcion,
      +codigo,
      foto,
      +precio,
      +stock
    );
    agregarProducto(producto)
      .then(() => {
        traerProductos()
          .then((rows: any) => {
            io.emit("productos", rows);
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
    const mensaje = new Mensaje(mail, fechayhora(), message);
    agregarMensaje(mensaje)
      .then((rows_1: any) => {
        traerMensajes()
          .then((rows: any) => {
            // console.log(rows.length, "mensajes traer");
            rows.length === 0
              ? console.log("no hay mensajes")
              : io.emit("mensajes", rows);
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
  console.log(`El servidor se encuentra en el puerto: 8080`);
});
