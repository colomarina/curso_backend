import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Producto } from './class/crear-producto';
import { ProductoI } from './interface/producto.interface';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productoService: ProductosService
  ) {}
  
  @Get()
  @UseGuards(JwtAuthGuard)
  traerProductos(): Promise<ProductoI[]> {
    return this.productoService.buscarTodos()
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  traerProducto(@Param('id') idProducto: string): Promise<ProductoI> {
    return this.productoService.buscarProductoId(idProducto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  crearProducto(@Body() producto: Producto): Promise<ProductoI> {
    return this.productoService.crearProducto(producto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  modificarProducto(
    @Param('id') idProducto: string,
    @Body() producto: Producto
    ): Promise<ProductoI> {
    return this.productoService.modificarProducto(idProducto, producto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  borrarProducto(@Param('id') idProducto: string): Promise<ProductoI> {
    return this.productoService.borrarProducto(idProducto);
  }
}
