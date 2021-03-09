"use strict";
exports.__esModule = true;
var file_1 = require("./file");
var producto_1 = {
    id: 1,
    title: 'Producto 1',
    price: 100,
    thubnail: 'url_1'
};
var producto_2 = {
    id: 0,
    title: 'Producto 2',
    price: 200,
    thubnail: 'url_2'
};
var producto_3 = {
    id: 0,
    title: 'Producto 3',
    price: 300,
    thubnail: 'url_3'
};
var archivo = new file_1.File('productos.txt');
var array = [producto_1];
archivo.crearGuardar(array);
var datos = archivo.leer();
datos.then(function (data) {
    var datos_agregar_2 = archivo.agregar(data, producto_2);
    // Datos agregados es un array
    datos_agregar_2
        .then(function (datos) {
        var datos_agregar_3 = archivo.agregar(datos, producto_3);
        datos_agregar_3
            .then(function (datos_3) {
            console.log(datos_3);
            // Aca lo elimino
            // const resultado = archivo.borrar();
            // resultado
            // .then( datos => {
            //     console.log(datos)
            // }) 
            // .catch( error => console.log(error))
        })["catch"](function (error) { return console.log(error); });
    })["catch"](function (error) { return console.log(error); });
})["catch"](function (error) { return console.log(error); });
