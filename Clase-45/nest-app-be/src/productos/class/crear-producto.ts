import { IsNotEmpty, Length } from "class-validator";

export class Producto {
  readonly id: string;
  @IsNotEmpty()
  @Length(1, 50)
  readonly nombre: string;
  @IsNotEmpty()
  readonly descripcion: string;
  @IsNotEmpty()
  readonly codigo: number;
}