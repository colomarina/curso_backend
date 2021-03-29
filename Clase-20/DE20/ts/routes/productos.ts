import { Router } from "express";
import {
  mensaje_error,
  usuario,
} from "./constantes";
import { v4 as uuidv4 } from "uuid";
import { Producto } from "./objetos";
import {
  actualizarProducto,
  agregarProducto,
  eliminarProducto,
  traerProducto,
  traerProductos,
} from "../DB/index.db";

let routerProductos = Router();

// Rutas para Productos

routerProductos.get("/productos", (req, res) => {
  traerProductos()
    .then((productos) => {
      // res.send(productos)
      res.render("pages/index");
    })
    .catch((error) => {
      // mensaje_error.error = error.errno;
      // mensaje_error.descripcion = "No hay productos cargados";
      // console.log(error);
      res.send(error);
    });
});
routerProductos.get("/productos/:producto_id", (req, res) => {
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
});
routerProductos.post("/productos", (req, res) => {
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
});
routerProductos.put("/productos/:producto_id", (req, res) => {
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
});
routerProductos.delete("/productos/:producto_id", (req, res) => {
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

});

export default routerProductos;
