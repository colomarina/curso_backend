import { Request, Response } from 'express';
import { mensaje_error, usuario } from "../routes/constantes";
import { logger } from '../config/winston.config';
import { carritoModel } from '../db/models/carrito.model';
import { enviarMailEthereal } from '../service/mail';
import { sendSMS, sendWhatsApp } from '../service/message';
import model from '../db/index.db'

module.exports = {

  getOne: (req: Request, res: Response) => {
    model?.traerCarrito(req.params.carrito_id)
      .then((datos: any) => {
        res.json(datos)
      })
      .catch((error: any) => {
        logger.error(error)
        res.send(error);
      })
  },

  create: (req: Request, res: Response) => {
    //Crea 1 carrito
    model?.crearCarrito(req.body)
      .then((data: any) => {
        res.sendStatus(201)
      })
      .catch((error: any) => {
        mensaje_error.error = `Error en el ${error.path}`;
        mensaje_error.descripcion = `Carrito ${error.value} no fue encontrado`;
        logger.error(mensaje_error)
        res.json(mensaje_error);
      });
  },


  update: (req: Request, res: Response) => {
    // Agrega un producto al carrito por su id
    if (usuario.administrador) {
      const idCarrito = req.params.carrito_id;
      const producto = req.body;
      model?.agregarProductoEnCarrito(idCarrito, producto)
        .then((data: any) => {
          res.sendStatus(200);
        })
        .catch((error: any) => {
          mensaje_error.error = error.errno;
          mensaje_error.descripcion = "Carrito no encontrado";
          logger.error(error)
          res.json(mensaje_error);
        });

    } else {
      mensaje_error.error = "1";
      mensaje_error.descripcion = "Acceso denegado , necesita rol Administrador";
      logger.error(mensaje_error)
      res.json(mensaje_error);
    }
  },

  finishBuying: (req: Request, res: Response) => {
    const idCarrito = req.body.carrito_id;
    model?.traerCarrito(idCarrito)
      .then( async (carrito: any) => {
        model?.traerUser(carrito.usuario)
          .then((user: any) => {
            let template = '<h1>Tu Pedido:</h1><br>';
            carrito.productos.forEach((producto: any) => {
              template += `
                <p>Producto: ${producto._id}</p><br>
                <p>Nombre: ${producto.nombre}</p><br>
                <p>Precio: ${producto.precio}</p><br>
              `;
            });
            const asunto = `nuevo pedido de ${user.nombreCompleto} y ${user.email}`;
            enviarMailEthereal({
              a: 'natalia.fahey35@ethereal.email',
              asunto,
              html: template
            })
            sendWhatsApp({
              para: '+5492216408251',
              mensaje: asunto
            })
            sendSMS({
              mensaje: "Su pedido ha sido recibido y se encuentra en proceso",
              para: '+542216408251'
            })
            res.json(template)
          })
          .catch((error) => {
            logger.error(error)
          })
      })
      .catch((error) => {
        mensaje_error.error = error.errno;
        mensaje_error.descripcion = "Carrito no encontrado";
        logger.error(error)
        res.json(mensaje_error);
      })

  }
}