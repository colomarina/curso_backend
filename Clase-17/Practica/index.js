// Creación de tabla

// const { Knex } = require('knex')(options)
// const { default: knex } = require('knex')
const { mysqlConnection } = require('./db/mysql.db')
const { sqlite3Connect } = require('./db/sqlite3.db')

const knex = require('knex')(sqlite3Connect)

// CREAR TABLA
// knex.schema.createTable('gatitos', table => {
//     table.increments('id')
//     table.string('name', 20)
//     table.integer('age',20)
// })
// .then( () => {
//     console.log('Table created!')
// })
// .catch((error) => {
//     console.log(error)
// })
// .finally(() => {
//     knex.destroy()
// })

// INSERT A LA TABLA
// const gatitos = [
//     {
//         name: 'Colito',
//         age:5
//     },
//     {
//         name: 'Flor',
//         age:1
//     },
//     {
//         name: 'Kira',
//         age:9
//     }
// ]

// knex('gatitos').insert(gatitos)
// .then( () => {
//     console.log('Gatitos inserted!')
// })
// .catch((error) => {
//     console.log(error)
// })
// .finally(() => {
//     knex.destroy()
// })

// CONSULTA
knex.from('gatitos').select('*') // TRAE TODO
// knex.from('gatitos').select('name').where('age','>','1') // CON WHERE
.then( (rows) => {
    for ( row of rows) {
        console.log(row.name)
    }
})
.catch((error) => {
    console.log(error)
})
.finally(() => {
    knex.destroy()
})