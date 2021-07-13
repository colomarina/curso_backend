import * as mongoose from 'mongoose';

export const ProductoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  codigo: Number,
})