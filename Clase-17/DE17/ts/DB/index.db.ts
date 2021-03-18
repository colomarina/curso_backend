import { knex_mysql, knex_sqlite3 } from "../routes/constantes";
import { Mensaje, Producto } from "../routes/objetos";

knex_sqlite3.schema
  .createTable(
    "mensajes",
    (table: { string: (arg0: string, arg1: number) => void }) => {
      table.string("mail", 50);
      table.string("dateandhour", 50);
      table.string("message", 100);
    }
  )
  .then(() => {
    console.log("Table mensajes created!");
  })
  .catch(() => {
    console.log("Table mensajes is already created");
  });
knex_mysql.schema
  .createTable(
    "productos",
    (table: { string: (arg0: string, arg1: number) => void; integer: (arg0: string, arg1: number) => void; }) => {
      table.string("id", 100);
      table.string("timestamp", 100);
      table.string("nombre", 100);
      table.string("descripcion", 100);
      table.integer("codigo", 50);
      table.string("foto", 100);
      table.integer("stock", 20);
    }
  )
  .then(() => {
    console.log("Table productos created!");
  })
  .catch((error:any) => {
    console.log("Table productos is already created");
  });

//  PRODUCTOS
//
export const traerProductos = async (): Promise<string> => {
  return await knex_mysql.from("productos").select();
};
export const traerProducto = async (id: string): Promise<string> => {
  return await knex_mysql.from("productos").select("*").where("id", "=", id);
};
export const agregarProducto = async (producto: Producto): Promise<string> => {
  return await knex_mysql("productos").insert(producto);
};
export const actualizarProducto = async (
  producto: Producto
): Promise<string> => {
  return await knex_mysql("productos")
    .where("id", "=", producto.id)
    .update(producto);
};
export const eliminarProducto = async (id: string): Promise<string> => {
  return await knex_mysql("productos").where("id", "=", id).del();
};

//    MENSAJES
export const traerMensajes = async (): Promise<string> => {
  return await knex_sqlite3.from("mensajes").select("*");
};
export const agregarMensaje = async (mensaje: Mensaje): Promise<string> => {
  return await knex_sqlite3("mensajes").insert(mensaje);
};
//  ASI HAY QUE MANEJARLO
// traerProductos()
//   .then((rows: any) => {
//     console.log(rows);
//   })
//   .catch((error: any) => {
//     console.log(error);
//   })
//   .finally(() => {
//     knex.destroy();
//   });
