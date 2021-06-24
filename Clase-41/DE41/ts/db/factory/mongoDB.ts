require('dotenv').config()
import mongoose from 'mongoose';
import bCrypt from "bcrypt";
const UserModel = require('../models/user');
import { mensajeModel } from '../models/mensajes.model';
import { productoModel } from '../models/producto.model';
import { carritoModel } from '../models/carrito.model';

export default class persistenciaMongo {
  constructor() {
    ; (async () => {
      try {
        await mongoose.connect(
          process.env.MONGO_URL || '', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        });
        console.log('Base de datos conectada')
      }
      catch (error) {
        console.log(error)
      }
    })()
  }

  /* PRODUCTOS */

  traerProductos = async (): Promise<string> => {
    return await productoModel.find({});
  }
  traerProducto = async (id: string): Promise<string> => {
    return await productoModel.findById(id);
  }
  agregarProducto = async (producto: any): Promise<string> => {
    const productoSaved = new productoModel(producto)
    return await productoSaved.save()
  }
  actualizarProducto = async (id: string, producto: any): Promise<string> => {
    return await productoModel.findByIdAndUpdate({
      _id: id
    }, {
      $set: producto
    })
  }
  eliminarProducto = async (id: string): Promise<string> => {
    return await productoModel.findByIdAndDelete(id);
  }
  traerProductosXNombres = async (nombre: any): Promise<string> => {
    let reg = new RegExp(`^${nombre}`);
    return await productoModel.find({ nombre: reg });
  }
  traerProductosXRangoPrecios = async (min_precio: any, max_precio: any): Promise<string> => {
    return await productoModel.find({ $and: [{ precio: { $gte: min_precio } }, { precio: { $lte: max_precio } }] });
  }

  /* MENSAJES */
  traerMensajes = async (): Promise<string> => {
    return await mensajeModel.find({});
  }
  agregarMensaje = async (mensaje: any): Promise<string> => {
    const mensajeSaved = new mensajeModel(mensaje)
    return await mensajeSaved.save()
  }

  /* PASSWORD HASH */
  createHash = (password: any) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
  }
  isValidPassword = (user: any, password: any) => {
    return bCrypt.compareSync(password, user.password)
  }

  /* USER */
  updateUser = async (id: any, user: any): Promise<string> => {
    const userId = id._id;
    return await UserModel.findByIdAndUpdate({
      _id: userId
    }, {
      $set: {
        nombreCompleto: user.nombreCompleto,
        direccion: user.direccion,
        edad: user.edad,
        celular: user.celular,
        foto: user.foto,
      }
    })
  }
  traerUser = async (id: string): Promise<string> => {
    return await UserModel.findById(id);
  }

  /* CARRITO */
  crearCarrito = async (user: any): Promise<string> => {
    const carritoVacio = {
      usuario: user._id,
      productos: []
    }
    const carritoCreated = new carritoModel(carritoVacio)
    return await carritoCreated.save()
  }
  agregarProductoEnCarrito = async (idCarrito: string, producto: any): Promise<string> => {
    const query = {_id: idCarrito};
    const updateDocument = {
      $push: {
        productos: producto
      }    
    }
    return await carritoModel.updateOne(query, updateDocument);
  }
  traerCarrito = async (id: string): Promise<string> => {
    return await carritoModel.findById(id);
  }
}


