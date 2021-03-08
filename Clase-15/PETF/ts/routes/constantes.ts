import { Carrito, Errores, Productos, Usuario} from "../objetos";
import {v4 as uuidv4} from "uuid";


export const listaProductos = new Productos();
export const listaPCarrito = new Productos();
export let mensaje_error = new Errores('','');
export const carrito = new Carrito(uuidv4(),listaPCarrito);
export const usuario = new Usuario(false);

