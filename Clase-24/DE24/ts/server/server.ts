import express from "express";
import routerProductos from "../routes/productos.routes";
import routerSession from "../routes/session";
import routerCarritos from "../routes/carritos.routes";
import session from 'express-session';
import cookieParser from "cookie-parser";
import path = require("path");
import { fechayhora } from "../routes/constantes";
import {
  agregarMensaje,
  agregarProducto,
  connect,
  traerMensajes,
  traerProductos,
} from "../DB/index.db";
declare module "express-session" {
  interface Session {
    user: string;
  }
}
const app = express();
const http = require("http").Server(app);
export const io = require("socket.io")(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
  secret: 'kira753951',
  resave: false,
  saveUninitialized: true,
  rolling:true,
  cookie: {
    maxAge:60000
  }
}))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/api", routerProductos);
app.use("/api", routerSession);
app.use("/api", routerCarritos);

io.on("connection", (socket: any) => {
  // console.log(socket.id);
  traerMensajes()
    .then((mensajes: any) => {
      mensajes.length === 0
        ? console.log("No hay mensajes en la DB")
        : socket.emit("mensajes", mensajes);
    })
    .catch((error: any) => {
      console.log(error);
    });
  socket.on("mensaje", (messag: any) => {
    const { mail, nombre, apellido, edad, alias, avatar, message } = messag;
    const mensaje = { 
      mail: mail,
      nombre: nombre, 
      apellido: apellido, 
      edad: edad,
      alias: alias,
      avatar: avatar,
      dateandhour: fechayhora(),
      message: message};
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
  connect()
        .then(() => console.log('El servidor se encuentra en el puerto: 8080 y se conecto correctamente a la DB ecommerce'))
        .catch((err) => console.log(err));
});
