import { Request, Response } from 'express';
import { mensaje_error, usuario } from "../routes/constantes";
import faker from 'faker';
import { normalizar } from "../service/normalize.service";
import { denormalize, schema } from "normalizr";
import { logger } from '../config/winston.config';
import model from '../db/index.db'

const authors = new schema.Entity('authors')
const mensaje = new schema.Entity('mensajes', {
  author: authors
})

module.exports = {

  getAll: async (req: Request, res: Response) => {
    const productos = await model?.traerProductos()
    try {
      if (productos) {
        res.json(productos)
      }
    } catch (error) {
      logger.error(error)
      res.send(error);
    }
  },


  getAllMensajes: (req: Request, res: Response) => {
    model?.traerMensajes()
      .then((mensajes: any) => {
        const mensajesNormalizados = normalizar(mensajes)
        const mensajesDesNormalizados = denormalize(mensajesNormalizados.result, [mensaje], mensajesNormalizados.entities)
        res.json(mensajesNormalizados)
      })
  },

  getOne: async (req: Request, res: Response) => {
    // Listar 1 producto x su id
    const producto = await model?.traerProducto(req.params.producto_id)
    try {
      if (producto) {
        res.json(producto)
      } else {
        res.json({ Error: 'Producto inexistente' })
      }
    } catch (error: any) {
      mensaje_error.error = `Error en el ${error.path}`;
      mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
      logger.error(error)
      res.json(mensaje_error);
    }
  },

  getWithFilters: (req: Request, res: Response) => {
    if (req.query.nombre !== undefined) {
      if (req.query.nombre !== '') {
        model?.traerProductosXNombres(req.query.nombre)
          .then((productos: any) => {
            res.send(productos)
          })
          .catch((error: any) => {
            logger.error(error)
            res.send(error);
          });
      } else {
        mensaje_error.error = `Error en el filtro`;
        mensaje_error.descripcion = `El filtro tiene ciertas inconsistencias`;
        logger.error(mensaje_error)
        res.json(mensaje_error);
      }
    }
    else if ((req.query.min_precio !== undefined) && (req.query.max_precio !== undefined)) {
      if ((req.query.min_precio !== '') && (req.query.max_precio !== '')) {
        model?.traerProductosXRangoPrecios(req.query.min_precio, req.query.max_precio)
          .then((productos: any) => {
            res.send(productos)
          })
          .catch((error: any) => {
            logger.error(error)
            res.send(error);
          });
      } else {
        mensaje_error.error = `Error en los filtros`;
        mensaje_error.descripcion = `Los filtros tienen ciertas inconsistencias`;
        logger.error(mensaje_error)
        res.json(mensaje_error);
      }
    }
  },

  create: async (req: Request, res: Response) => {
    //Agregar un producto al listado
    if (usuario.administrador) {
      if (
        req.body.nombre === undefined ||
        req.body.descripcion === undefined ||
        req.body.codigo === undefined ||
        req.body.foto === undefined ||
        req.body.precio === undefined ||
        req.body.stock === undefined
      ) {
        mensaje_error.error = "1";
        mensaje_error.descripcion = "Debe rellenar todos los campos...";
        logger.error(mensaje_error)
        res.json(mensaje_error);
      } else {
        const productoCreado = await model?.agregarProducto(req.body)
        try {
          if (productoCreado) {
            res.json(productoCreado)
          }
        } catch (error: any) {
          mensaje_error.error = `Error en el ${error.path}`;
          mensaje_error.descripcion = `Producto ${error.value} no fue encontrado`;
          logger.error(mensaje_error)
          res.json(mensaje_error);
        }
      }
    } else {
      mensaje_error.error = "403";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    }
  },
  createRandom: (req: Request, res: Response) => {

    let p = []
    let cantidad: any;
    if (req.query.cant === '0') {
      mensaje_error.error = "Error en la cantidad";
      mensaje_error.descripcion = "No hay productos";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    } else {
      (req.query.cant === '') ? cantidad = 10 : cantidad = req.query.cant;
      for (let index = 0; index < cantidad; index++) {
        let prod = {
          nombre: faker.commerce.productName(),
          descripcion: faker.commerce.productDescription(),
          codigo: index + 1,
          foto: faker.image.imageUrl(),
          precio: +faker.commerce.price(),
          stock: 100
        }
        p.push(prod)
      }
      res.json(p)
    }
  },

  update: async (req: Request, res: Response) => {
    // Actualiza un producto por su id
    if (usuario.administrador) {
      const id = req.params.producto_id;
      const update = req.body;
      const producto: any = await model?.actualizarProducto(id, update)
      try {
        const productoActualizado = await model?.traerProducto(producto.id)
        if (productoActualizado) {
          res.json(productoActualizado)
        } else {
          res.json({ Error: 'Producto inexistente' })
        }
      } catch (error: any) {
        mensaje_error.error = `Error en el ${error.path}`;
        mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
        logger.error(mensaje_error)
        res.json(mensaje_error);
      }
    } else {
      mensaje_error.error = "1";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    }
  },

  delete: (req: Request, res: Response) => {
    // Elimina un producto por su id
    if (usuario.administrador) {
      model?.eliminarProducto(req.params.producto_id)
        .then((producto: any) => {
          (producto !== null) ? res.send(producto) : res.json({ Error: 'No se pudo eliminar el producto (Producto no encontrado)' });
        })
        .catch((error: any) => {
          mensaje_error.error = `Error en el ${error.path}`;
          mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
          logger.error(error)
          res.json(mensaje_error);
        });
    } else {
      mensaje_error.error = "403";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    }

  }
}

class ControladorProductos {
  constructor() {
    this
  }
}