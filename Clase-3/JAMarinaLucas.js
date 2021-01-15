const finalizar = (cantidadPalabras) => {
    console.log(`Proceso completo, y hay ${cantidadPalabras} palabras`)
}
var id;
let recorrerTexto = (string,callback,opcional) => {
    let cantidad_de_palabras = 0;
    string = string.split(' ');
    id = setInterval(() => {
        if (!(cantidad_de_palabras < string.length)) {
            callback(cantidad_de_palabras);
            clearInterval(id)
        }else{
            console.log(string[cantidad_de_palabras++])
        }
    }, (opcional)?opcional:1000);
}

recorrerTexto('Hola Tutor soy tu alumno Lucas Marina',finalizar)