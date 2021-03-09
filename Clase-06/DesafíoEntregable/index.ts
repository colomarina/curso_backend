import { File } from "./file";

const producto_1 = {
    id: 1,
    title:'Producto 1',
    price: 100,
    thubnail: 'url_1'
}
const producto_2 = {
    id: 0,
    title:'Producto 2',
    price: 200,
    thubnail: 'url_2'
}
const producto_3 = {
    id: 0,
    title:'Producto 3',
    price: 300,
    thubnail: 'url_3'
}


const archivo = new File('productos.txt');

const array = [producto_1];

archivo.crearGuardar(array);

const datos = archivo.leer();
datos.then(
    data => {
        const datos_agregar_2 = archivo.agregar(data, producto_2)
        // Datos agregados es un array
        datos_agregar_2
        .then( 
            datos => {
                const datos_agregar_3 = archivo.agregar(datos, producto_3)
                datos_agregar_3
                .then(
                    datos_3 => {
                        console.log(datos_3)
                        // Aca lo elimino
                        // const resultado = archivo.borrar();
                        // resultado
                        // .then( datos => {
                        //     console.log(datos)
                        // }) 
                        // .catch( error => console.log(error))
                    }
                )
                .catch( error => console.log(error))
            }
        )
        .catch( error => console.log(error))
    }
)
.catch( error => console.log(error))