import * as fs  from "fs";

interface Producto {
    id: number;
    title: string;
    price: number;
    thubnail: string;
}

export class File {
    filename: string;

    constructor(nuevoFilename: string){
        this.filename = nuevoFilename;
    }

    async leer () {
        try {
            const dataFile = await fs.promises.readFile(`./${this.filename}`,'utf-8')
            return JSON.parse(dataFile)
        } catch (error) {
            return '[]'
        }
    }
    async crearGuardar (contenido: Array<Producto>) {
        try {
            const dataFile = await fs.promises.writeFile(`./${this.filename}`,JSON.stringify(contenido))
            return 'Se guardo correctamente el archivo! '
        } catch (error) {
            return error
        }
    }
    async agregar (array: any, producto: Producto) {
        try {
            producto.id = array.length + 1;
            array = [...array, producto]
            const dataFile = await fs.promises.writeFile(`./${this.filename}`, JSON.stringify(array));
            return array
        } catch (error) {
            return `El archivo no existe! \n${error}` 
        }
    }
    async borrar () {
        try {
            const dataFile = await fs.promises.unlink(`./${this.filename}`)
            // return await fs.promises.unlink(`./${this.filename}`);
            return `Se elimino correctamente!`
        } catch (error) {
            return error
        }
    }

}




