require('dotenv').config()
import persistenciaMemory from './factory/memory'
import persistenciaFileSystem from './factory/fileSystem'
import persistenciaMongo from "./factory/mongoDB"

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryPersonaModel {
    static set(opcion: string) {
        console.log('**** PERSISTENCIA SELECCIONADA **** [' + opcion + ']')
        switch(opcion) {
            case 'Mem': return new persistenciaMemory()
            case 'File': return new persistenciaFileSystem()
            case 'Mongo': return new persistenciaMongo()
        }
    }
}

const opcion = process.argv[2] || 'Mongo'
export default FactoryPersonaModel.set(opcion)