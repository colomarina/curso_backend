import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
const productosController = require('../controller/productos.controller')

let routerProductos = Router();

// Rutas para Productos
// routerProductos.get("/productos", productosController.getAll);
// // POST
// routerProductos.post("/productos",productosController.create);
// // /productos/:producto_id
// routerProductos.get("/productos/:producto_id", productosController.getOne);
// routerProductos.put("/productos/:producto_id", productosController.update);
// routerProductos.delete("/productos/:producto_id", productosController.delete);

// /productos/vista/?nombre=Agua
// /productos/vista/?min_precio=1000&max_precio=3000
// routerProductos.get("/productos/vista", productosController.getWithFilters);
// /productos/vista-test?cant=5
// routerProductos.get("/productos/vista-test", productosController.createRandom);

class RouterProductos {
  controladorProductos: any;

  constructor() {
    this.controladorProductos = productosController;
  }

  start() {
    routerProductos.get('/productos', this.controladorProductos.getAll)
    routerProductos.post('/productos', this.controladorProductos.create)
    routerProductos.get('/productos/:producto_id', this.controladorProductos.getOne)
    routerProductos.put('/productos/:producto_id', this.controladorProductos.update)
    routerProductos.delete('/productos/:producto_id', this.controladorProductos.delete)

    return routerProductos
  }
}

export default RouterProductos;

export class RouterProductosGraphQL {
  controladorProductos: any;

  constructor() {
    this.controladorProductos = productosController;
  }

  start() {
    // GraphQL schema
    const schema = buildSchema(`
        type Query {
            unProducto(_id: String): Producto
        }
        type Mutation {
            guardarProducto(
                nombre: String!,
                descripcion: String!,
                codigo: Int!,
                foto: String!,
                precio: Int!,
                stock: Int!,
            ): Producto,
            borrarProducto(
                _id: String!,
            ): Producto,                                
        },
        type Producto {
            _id: String,
            nombre: String
            descripcion: String
            codigo: Int
            foto: String
            precio: Int
            stock: Int
        }    
    `);

    // Root resolver
    const root = {
      unProducto: (_id: any) => this.controladorProductos.obtenerProducto(_id),
      crearProducto: this.controladorProductos.crearProducto,
      actualizarProducto: (_id: any, producto: any) => this.controladorProductos.actualizarNoticia(_id, producto),
      borrarProducto: (_id: any) => this.controladorProductos.borrarNoticia(_id)
    };

    return graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    })
  }
}
