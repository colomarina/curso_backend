/**
 * Productos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: { type: 'string', columnName: '_id' },
    timestamp: { type: 'string', columnType: 'date'},
    nombre: { type: 'string', required: true },
    descripcion: { type: 'string', required: true},
    codigo: { type: 'number', required: true },
    foto: { type: 'string', required: true },
    precio: { type: 'number', required: true },
    stock: { type: 'number', required: true },
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
  },
  schema: true,
};

