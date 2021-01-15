const finalizar = (cantidadPalabras) => {
    console.log(`Proceso completo, y hay ${cantidadPalabras} palabras`)
}
var id;
let recorrerTexto = (string,callback,tiempoOpcional) => {
    let cantidad_de_palabras = 0;
    string = string.split(' ');
    id = setInterval(() => {
        if (!(cantidad_de_palabras < string.length)) {
            callback(cantidad_de_palabras);
            clearInterval(id)
        }else{
            console.log(string[cantidad_de_palabras++])
        }
    }, (typeof(tiempoOpcional)==='undefined')?1000:tiempoOpcional)
}

// let recorrer = () => {
//     // recorrerTexto('Hola Tutor soy tu alumno Lucas Marina',finalizar,() => {
//         // recorrerTexto('Buenos Dias soy Lucas',finalizar,5000,() => {
//         //     recorrerTexto('Buenas Tardes',finalizar);
//         // });
//         recorrerTexto('Hola Mundo',finalizar,() => {
//             recorrerTexto('Chau',finalizar,2000)
//         })
//     // });
// }
const promesa = recorrerTexto('Hola Mundo',finalizar)
console.log(promesa,'hola');
