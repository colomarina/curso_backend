import { Router } from "express";
import {
  knex_mysql,
  knex_sqlite3,
  listaProductos,
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
    .then((rows: any) => {
      // console.log(rows[0])
      // res.json(rows);
      res.render("pages/index", rows);
    })
    .catch((error: any) => {
      mensaje_error.error = error.errno;
      mensaje_error.descripcion = "No hay productos cargados";
      console.log(error);
      res.json(mensaje_error);
    });
});
routerProductos.get("/productos/:producto_id", (req, res) => {
  // Listar 1 producto x su id
  traerProducto(req.params.producto_id)
    .then((rows: any) => {
      res.json(rows[0]);
    })
    .catch((error: any) => {
      mensaje_error.error = error.errno;
      mensaje_error.descripcion = "Producto no encontrado";
      console.log(error);
      res.json(mensaje_error);
    });
});
routerProductos.post("/productos", (req, res) => {
  //Agregar un producto al listado
  // console.log(req.body.nombre)
  if (usuario.administrador) {
    if (
      req.body.nombre === undefined ||
      req.body.descripcion === undefined ||
      req.body.codigo === undefined ||
      req.body.foto === undefined ||
      req.body.stock === undefined
    ) {
      mensaje_error.error = "1";
      mensaje_error.descripcion = "Debe rellenar todos los campos...";
      res.json(mensaje_error);
    } else {
      const { nombre, descripcion, codigo, foto, stock } = req.body;
      let id = uuidv4();
      const producto = new Producto(
        id,
        nombre,
        descripcion,
        +codigo,
        foto,
        +stock
      );
      agregarProducto(producto)
        .then(() => {
          res.json(producto);
        })
        .catch((error: any) => {
          mensaje_error.error = error.errno;
          mensaje_error.descripcion = "Producto no encontrado";
          console.log(error);
          res.json(mensaje_error);
        });
    }
  } else {
    mensaje_error.error = "1";
    mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
    res.json(mensaje_error);
  }
});
routerProductos.patch("/productos/:producto_id", (req, res) => {
  // Actualiza un producto por su id
  if (usuario.administrador) {
    traerProducto(req.params.producto_id)
      .then((rows: any) => {
        // ACA DEBERIA VALIDAR QUE ESTAN TODOS LOS CAMPOS DECLARADOS PARA ACTUALIZAR NO?
        const id = req.params.producto_id;
        const { nombre, descripcion, codigo, foto, stock } = req.body;
        const productoActualizar = new Producto(
          id,
          nombre,
          descripcion,
          +codigo,
          foto,
          +stock
        );
        actualizarProducto(productoActualizar)
          .then(() => {
            res.json(productoActualizar);
          })
          .catch((error: any) => {
            mensaje_error.error = error.errno;
            mensaje_error.descripcion = "Producto no encontrado";
            console.log(error);
            res.json(mensaje_error);
          });
      })
      .catch((error: any) => {
        mensaje_error.error = error.errno;
        mensaje_error.descripcion =
          "Producto no encontrado, no se puede actualizar";
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
    traerProducto(req.params.producto_id)
    .then((rows: any) => {
      eliminarProducto(req.params.producto_id)
        .then(() => {
          res.json(rows[0]);
        })
        .catch((error: any) => {
          mensaje_error.error = error.errno;
          mensaje_error.descripcion = "Producto no encontrado";
          console.log(error);
          res.json(mensaje_error);
        });
      
    })
    .catch((error: any) => {
      mensaje_error.error = error.errno;
      mensaje_error.descripcion = "Producto no encontrado, no se puede eliminar";
      console.log(error);
      res.json(mensaje_error);
    });
  } else {
    mensaje_error.error = "1";
    mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
    res.json(mensaje_error);
  }

});

export default routerProductos;
