const finalizar = (cantidadPalabras) => {
    console.log(`Proceso completo, y hay ${cantidadPalabras} palabras`)
}
var id;

let recorrerTexto = (string,tiempoOpcional = 1000, callback) => {
    let cantidad_de_palabras = 0;
    string = string.split(' ');

    id = setInterval(() => {
        if (cantidad_de_palabras < string.length) {
            console.log(string[cantidad_de_palabras++])
        } else {
            clearInterval(id)
            callback(string.length);
        }
    }, tiempoOpcional, string)

}

recorrerTexto('Hola Mundo', 500, (count) => {
    let totalPalabras = count;
    recorrerTexto('2Hola 2Mundo', 500, (count) => {
        totalPalabras += count;
        recorrerTexto('3Hola 3Mundo', 500, (count) => {
            totalPalabras += count;
            finalizar(totalPalabras);
        })
    })
})