import * as fs  from "fs";

interface Mensaje {
    mail:string,
    dateandhour:string,
    message:string
}

export class File {
    
    filename: string;

    constructor(nuevoFilename: string){
        this.filename = nuevoFilename;
    }
    
    async leer () {
        try {
            const dataFile = await fs.promises.readFile(`./ts/${this.filename}`,'utf-8')
            return JSON.parse(dataFile)
        } catch (error) {
            return '[]'
        }
    }
    
    async crearGuardar (contenido: Array<Mensaje>) {
        try {
            const dataFile = await fs.promises.writeFile(`./ts/${this.filename}`,JSON.stringify(contenido))
            return 'Se guardo correctamente el archivo! '
        } catch (error) {
            return error
        }
    }
    
    async agregar (array_chat: any) {
        try {
            const dataFile = await fs.promises.writeFile(`./ts/${this.filename}`, JSON.stringify(array_chat));
            return array_chat
        } catch (error) {
            return `El archivo no existe! \n${error}` 
        }
    }
    
    async borrar () {
        try {
            const dataFile = await fs.promises.unlink(`./ts/${this.filename}`)
            // return await fs.promises.unlink(`./${this.filename}`);
            return `Se elimino correctamente!`
        } catch (error) {
            return error
        }
    }

}




