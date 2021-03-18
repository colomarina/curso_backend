import { knex_mysql, knex_sqlite3 } from "../routes/constantes";
import { mysqlConnection } from "./mysql.db";
import { sqlite3Connection } from "./sqlite3.db";

// try {
//     knex_sqlite3.schema.createTable('gatitos', table => {
//         table.increments('id')
//         table.string('name', 20)
//         table.integer('age',20)
//     })
//     .then( () => {
//         console.log('Table created!')
//     })
//     .catch((error: any) => {
//         console.log(error)
//     })
//     .finally(() => {
//         knex_sqlite3.destroy()
//     })
// } catch (error) {
    
// }


export const traerMensajes =  async ():Promise<string> => {
    return await knex_sqlite3.from('gatitos').select('*')
};
export const traerProductos_2 = async ():Promise<string> => {
    return await knex_mysql.from('gatitos').select()
}
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