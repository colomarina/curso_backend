interface Producto_I {
    id:any,
    title:string,
    price:number,
    thumbnail:string
}
interface Errores_I {
    error:string
}

export class Errores {
    error: string;

    constructor(mensaje: string){
        this.error = mensaje;
    }
}

export class Producto {
    id:any;
    title:string | undefined;
    price:number | undefined;
    thumbnail:string | undefined;

    constructor(nuevoId: any ,nuevoTitle: string, nuevoPrice: number,nuevoThumbnail: string) {
        this.id = nuevoId;
        this.title = nuevoTitle;
        this.price = nuevoPrice;
        this.thumbnail = nuevoThumbnail;
    }
    
}