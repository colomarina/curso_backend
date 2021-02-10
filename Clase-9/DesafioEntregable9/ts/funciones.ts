interface Producto_I {
    id:any,
    title:string,
    price:number,
    thumbnail:string
}
interface Errores_I {
    error:string
}

export class Errores implements Errores_I {
    error: string;

    constructor(mensaje: string){
        this.error = mensaje;
    }

    
}

export class Producto implements Producto_I{

    id:any;
    title:string;
    price:number;
    thumbnail:string;

    constructor(nuevoId: number ,nuevoTitle: string, nuevoPrice: number,nuevoThumbnail: string) {
        this.id = nuevoId + 1;
        this.title = nuevoTitle;
        this.price = nuevoPrice;
        this.thumbnail = nuevoThumbnail;
    }
}

export class Productos {

    productos: Array<Producto>;

    constructor() {
        this.productos = []
    }

    buscar (id:any) {
        return this.productos.find( prod => prod.id == id)
    }

    agregar (nuevoProducto:Producto) {
        return this.productos.push(nuevoProducto)
    }

    eliminar (id:any) {
        this.productos = this.productos.filter(prod => prod.id != id)
        return this.productos
    }

    actualizar (datosActualizar:Producto){
        this.productos.map(prod => {
            console.log(prod)
            if (prod.id === datosActualizar.id ) {
                prod.price = datosActualizar.price
                prod.title = datosActualizar.title
                prod.thumbnail = datosActualizar.thumbnail
            }
        })
        return datosActualizar
    }
}