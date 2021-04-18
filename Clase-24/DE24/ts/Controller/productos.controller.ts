import { actualizarProducto, agregarProducto, eliminarProducto, traerMensajes, traerProducto, traerProductos, traerProductosXNombres, traerProductosXRangoPrecios } from "../DB/index.db";
import { mensaje_error, usuario } from "../routes/constantes";
import faker from 'faker';
import { desnormalizar, normalizar } from "../Service/normalize.service";

import { denormalize, normalize, schema } from "normalizr";
import { MensajeJSON } from "../routes/objetos";
import { io } from "../server/server";

const authors = new schema.Entity('authors')
const mensaje = new schema.Entity('mensajes', {
  author: authors
})

module.exports = {

  getAll: (req: any, res: any) => {
    io.on("connection", (socket: any) => {
      io.emit("login", req.session)
    })
    traerProductos()
      .then(() => {
        res.render("pages/index");
      })
      .catch((error) => {
        res.send(error);
      });
  },

  getAllMensajes: (req: any, res: any) => {
    traerMensajes()
      .then((mensajes: any) => {
        const mensajesNormalizados = normalizar(mensajes)
        const mensajesDesNormalizados = denormalize(mensajesNormalizados.result, [mensaje], mensajesNormalizados.entities)
        // const mensajesDesNormalizados = desnormalizar(mensajesNormalizados)
        res.json(mensajesNormalizados)
      })
  },

  getOne: (req: any, res: any) => {
    // Listar 1 producto x su id
    traerProducto(req.params.producto_id)
      .then((producto: String) => {
        (producto !== null) ? res.send(producto) : res.json({ Error: 'Producto inexistente' });
      })
      .catch((error: any) => {
        mensaje_error.error = `Error en el ${error.path}`;
        mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
        res.json(mensaje_error);
      });
  },

  getWithFilters: (req: any, res: any) => {
    if (req.query.nombre !== undefined) {
      if (req.query.nombre !== '') {
        traerProductosXNombres(req.query.nombre)
          .then((productos: any) => {
            res.send(productos)
          })
          .catch((error) => {
            res.send(error);
          });
      } else {
        mensaje_error.error = `Error en el filtro`;
        mensaje_error.descripcion = `El filtro tiene ciertas inconsistencias`;
        res.json(mensaje_error);
      }
    }
    else if ((req.query.min_precio !== undefined) && (req.query.max_precio !== undefined)) {
      if ((req.query.min_precio !== '') && (req.query.max_precio !== '')) {
        traerProductosXRangoPrecios(req.query.min_precio, req.query.max_precio)
          .then((productos: any) => {
            res.send(productos)
          })
          .catch((error) => {
            res.send(error);
          });
      } else {
        mensaje_error.error = `Error en los filtros`;
        mensaje_error.descripcion = `Los filtros tienen ciertas inconsistencias`;
        res.json(mensaje_error);
      }
    }
  },

  create: (req: any, res: any) => {
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
        res.json(mensaje_error);
      } else {
        agregarProducto(req.body)
          .then(() => {
            res.sendStatus(201)
          })
          .catch((error: any) => {
            mensaje_error.error = `Error en el ${error.path}`;
            mensaje_error.descripcion = `Producto ${error.value} no fue encontrado`;
            console.log(error)
            res.json(mensaje_error);
          });
      }
    } else {
      mensaje_error.error = "403";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      res.json(mensaje_error);
    }
  },
  createRandom: (req: any, res: any) => {

    let p = []
    let cantidad;
    if (req.query.cant === '0') {
      mensaje_error.error = "Error en la cantidad";
      mensaje_error.descripcion = "No hay productos";
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

  update: (req: any, res: any) => {
    // Actualiza un producto por su id
    if (usuario.administrador) {
      const id = req.params.producto_id;
      const update = req.body;
      actualizarProducto(id, update)
        .then((data) => {
          console.log(data)
          traerProducto(id)
            .then((producto: String) => {
              (producto !== null) ? res.send(producto) : res.json({ Error: 'Producto inexistente' });
            })
            .catch((error: any) => {
              mensaje_error.error = `Error en el ${error.path}`;
              mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
              res.json(mensaje_error);
            });
        })
        .catch((error: any) => {
          mensaje_error.error = error.errno;
          mensaje_error.descripcion = "Producto no encontrado";
          console.log(error);
          res.json(mensaje_error);
        });

    } else {
      mensaje_error.error = "1";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      res.json(mensaje_error);
    }
  },

  delete: (req: any, res: any) => {
    // Elimina un producto por su id
    if (usuario.administrador) {
      eliminarProducto(req.params.producto_id)
        .then((producto: any) => {
          (producto !== null) ? res.send(producto) : res.json({ Error: 'No se pudo eliminar el producto (Producto no encontrado)' });
        })
        .catch((error: any) => {
          mensaje_error.error = `Error en el ${error.path}`;
          mensaje_error.descripcion = `El ${error.path} ${error.value} tiene ciertas inconsistencias`;
          res.json(mensaje_error);
        });
    } else {
      mensaje_error.error = "403";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      res.json(mensaje_error);
    }

  }
}