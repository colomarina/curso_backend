import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from './class/crear-producto';
import { ProductoI } from './interface/producto.interface';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel('Producto') private readonly productoModel: Model<ProductoI>
  ) {}

  async buscarTodos(): Promise<ProductoI[]> {
    return await this.productoModel.find();
  }
  
  async buscarProductoId(id: string): Promise<ProductoI> {
    return await this.productoModel.findOne({ _id: id });
  }

  async crearProducto(producto: Producto): Promise<ProductoI> {
    const nuevoProducto = new this.productoModel(producto);
    return await nuevoProducto.save();
  }

  async modificarProducto(id: string, producto: Producto): Promise<ProductoI> {
    return await this.productoModel.findByIdAndUpdate(id, producto, { new: true });
  }

  async borrarProducto(id: string): Promise<ProductoI> {
    return await this.productoModel.findByIdAndRemove(id);
  }

}
