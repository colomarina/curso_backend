interface Producto_I {
    id:any,
    title:string,
    price:number,
    thumbnail:string
}
interface Errores_I {
    error:string
}
interface Mensajes_I {
    mail:string,
    dateandhour:string,
    message:string
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
            // console.log(prod)
            if (prod.id === datosActualizar.id ) {
                (datosActualizar.price !== undefined) ?prod.price = datosActualizar.price:prod.price = prod.price;
                // console.log(datosActualizar.title.length);
                (datosActualizar.title !== undefined) ?prod.title = datosActualizar.title:prod.title = prod.title;
                // console.log(datosActualizar.thumbnail.length);
                (datosActualizar.thumbnail !== undefined) ?prod.thumbnail = datosActualizar.thumbnail:prod.thumbnail = prod.thumbnail;
            }
        })
        return datosActualizar
    }
}

export class Mensaje implements Mensajes_I{

    mail:string;
    dateandhour:string;
    message:string;

    constructor(nuevoMail: string , nuevoDateandhour: string , nuevoMessage: string) {
        this.mail = nuevoMail;
        this.dateandhour = nuevoDateandhour;
        this.message = nuevoMessage;
    }
}

export class Mensajes {
    
    mensajes: Array<Mensajes_I>;

    constructor() {
        this.mensajes = []
    }

    agregar (nuevoMensaje:Mensajes_I) {
        return this.mensajes.push(nuevoMensaje)
    }

    
}



export function fechayhora() {
    const hoy = new Date()
    const fecha = hoy.getDate() + '/' + (hoy.getMonth()+1) + '/' + hoy.getFullYear()
    const hora = hoy.getHours()+':'+ hoy.getMinutes()+':'+hoy.getSeconds()
    const fyh = fecha + ' ' + hora
    return fyh;
}