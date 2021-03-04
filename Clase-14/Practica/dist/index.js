'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Perro = function () {
    function Perro(nombre, raza) {
        _classCallCheck(this, Perro);

        this.nombre = nombre;
        this.raza = raza;
    }

    _createClass(Perro, [{
        key: 'getNombre',
        value: function getNombre() {
            return this.nombre;
        }
    }, {
        key: 'getRaza',
        value: function getRaza() {
            return this.raza;
        }
    }]);

    return Perro;
}();

var perro = new Perro('Yago', ' mestizo');

var nombre = perro.getNombre();
var raza = perro.getRaza();

var presentarPerro = function presentarPerro(nombre, raza) {
    console.log('Mi perro se llama ' + nombre + ' y su raza es ' + raza);
};

presentarPerro(nombre, raza);
