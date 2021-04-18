import mongoose from 'mongoose';
import { Mensaje, Producto } from "../routes/objetos";
import { mensajeModel } from "./models/mensajes.model";
import { productoModel } from './models/producto.model';

const conn = mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);

export const connect = async (): Promise<any> => {
  return await conn
}

// PRODUCTOS

export const traerProductos = async (): Promise<string> => {
  return await productoModel.find({});
};
export const traerProducto = async (id: string): Promise<string> => {
  return await productoModel.findById(id);
};
export const agregarProducto = async (producto: Producto): Promise<string> => {
  const productoSaved = new productoModel(producto)
  return await productoSaved.save()
};
export const actualizarProducto = async (id: string,producto: any): Promise<string> => {
  return await productoModel.findByIdAndUpdate( {
    _id: id
  } , {
    $set: producto
  })
};
export const eliminarProducto = async (id: string): Promise<string> => {
  return await productoModel.findByIdAndDelete(id);
};
export const traerProductosXNombres = async (nombre: any): Promise<string> => {
  let reg = new RegExp(`^${nombre}`);
  return await productoModel.find({nombre: reg});
};
export const traerProductosXRangoPrecios = async (min_precio: any, max_precio: any): Promise<string> => {
  return await productoModel.find({$and:[{precio: {$gte:min_precio}},{precio: {$lte:max_precio}}]});
};

//  MENSAJES
export const traerMensajes = async (): Promise<string> => {
  return await mensajeModel.find({});
};
export const agregarMensaje = async (mensaje: Mensaje): Promise<string> => {
  const mensajeSaved = new mensajeModel(mensaje)
  return await mensajeSaved.save()
};