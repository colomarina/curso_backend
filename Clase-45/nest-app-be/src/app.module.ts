import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosController } from './productos/productos.controller';
import { ProductosService } from './productos/productos.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ProductoSchema } from './productos/schemas/productos.schema'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';

dotenv.config();

const uri = `mongodb+srv://colito:LM753951@cluster0.yjnag.mongodb.net/ecommerce?retryWrites=true&w=majority`

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([{ name: 'Producto', schema: ProductoSchema }]),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, ProductosController],
  providers: [AppService, ProductosService, AuthService],
})
export class AppModule {}
