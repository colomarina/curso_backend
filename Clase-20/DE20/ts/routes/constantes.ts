import { Carrito, Errores, Productos, Usuario } from "./objetos";
import { v4 as uuidv4 } from "uuid";
import { sqlite3Connection } from "../DB/knex/sqlite3.db";
import { mysqlConnection } from "../DB/knex/mysql.db";

export const knex_mysql = require("knex")(mysqlConnection);
export const knex_sqlite3 = require("knex")(sqlite3Connection);
export const listaProductos = new Productos();
export const listaPCarrito = new Productos();
export let mensaje_error = new Errores("", "");
export const carrito = new Carrito(uuidv4(), listaPCarrito);
export const usuario = new Usuario(true);
export function fechayhora() {
  const hoy = new Date();
  const fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
  const hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  const fyh = fecha + " " + hora;
  return fyh;
}
