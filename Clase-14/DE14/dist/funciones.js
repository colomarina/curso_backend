"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fechayhora = exports.Mensajes = exports.Mensaje = exports.Productos = exports.Producto = exports.Errores = void 0;
var Errores = /** @class */ (function () {
    function Errores(mensaje) {
        this.error = mensaje;
    }
    return Errores;
}());
exports.Errores = Errores;
var Producto = /** @class */ (function () {
    function Producto(nuevoId, nuevoTitle, nuevoPrice, nuevoThumbnail) {
        this.id = nuevoId + 1;
        this.title = nuevoTitle;
        this.price = nuevoPrice;
        this.thumbnail = nuevoThumbnail;
    }
    return Producto;
}());
exports.Producto = Producto;
var Productos = /** @class */ (function () {
    function Productos() {
        this.productos = [];
    }
    Productos.prototype.buscar = function (id) {
        return this.productos.find(function (prod) { return prod.id == id; });
    };
    Productos.prototype.agregar = function (nuevoProducto) {
        return this.productos.push(nuevoProducto);
    };
    Productos.prototype.eliminar = function (id) {
        this.productos = this.productos.filter(function (prod) { return prod.id != id; });
        return this.productos;
    };
    Productos.prototype.actualizar = function (datosActualizar) {
        this.productos.map(function (prod) {
            // console.log(prod)
            if (prod.id === datosActualizar.id) {
                (datosActualizar.price !== undefined) ? prod.price = datosActualizar.price : prod.price = prod.price;
                // console.log(datosActualizar.title.length);
                (datosActualizar.title !== undefined) ? prod.title = datosActualizar.title : prod.title = prod.title;
                // console.log(datosActualizar.thumbnail.length);
                (datosActualizar.thumbnail !== undefined) ? prod.thumbnail = datosActualizar.thumbnail : prod.thumbnail = prod.thumbnail;
            }
        });
        return datosActualizar;
    };
    return Productos;
}());
exports.Productos = Productos;
var Mensaje = /** @class */ (function () {
    function Mensaje(nuevoMail, nuevoDateandhour, nuevoMessage) {
        this.mail = nuevoMail;
        this.dateandhour = nuevoDateandhour;
        this.message = nuevoMessage;
    }
    return Mensaje;
}());
exports.Mensaje = Mensaje;
var Mensajes = /** @class */ (function () {
    function Mensajes() {
        this.mensajes = [];
    }
    Mensajes.prototype.agregar = function (nuevoMensaje) {
        return this.mensajes.push(nuevoMensaje);
    };
    return Mensajes;
}());
exports.Mensajes = Mensajes;
function fechayhora() {
    var hoy = new Date();
    var fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fyh = fecha + ' ' + hora;
    return fyh;
}
exports.fechayhora = fechayhora;
