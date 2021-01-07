// Ejercicio 1

// var numero1 = 5;
// var numero2 = 8;

// if (numero1 < numero2) {
//     console.log("numero1 no es mayor que numero2");
// }
// if (numero2 > 0){
//     console.log("numero2 es positivo");
// }
// if ((numero1 < 0) || (numero1 != 0)){
//     console.log("numero1 es negativo o distinto de cero");
// }
// if ((numero1 + 1) < numero2 ){
//     console.log("Incrementar en 1 unidad el valor de numero1 no lo hace mayor o igual que numero2");
// }

// Ejercicio 2

var valores = [true, 5, false, "hola", "adios",2];

function a(array) {
    let size_max = 0;
    let resultado;
    for (valor in array) {
        if (((typeof array[valor]) === 'string') && (array[valor].length > size_max)) {
            resultado = array[valor];
            size_max = array[valor].length;
        }
    }
    return (resultado == undefined) ? 'No existen valores string en el arreglo' : resultado ;
}

function b(array) {
    let resultado;
    for (valor in array) {
        if (array[valor] == false) {
            resultado = valor;
        }
    }
    return (resultado == undefined) ? 'No existen el valor "false" en el arreglo' : resultado ;
}

function c(array, operacion) {
    let resultado;
    let array_para_operar = [];
    for ( valor in array) {
        if ((typeof array[valor]) === 'number') {
            array_para_operar.push(array[valor]);
            // con spread
            // [...array_para_operar, array[valor]];

        }
    }
    switch (operacion) {
      case "suma":
        //   .reduce( (acumulador, valorActual) => acumulador + valorActual, valor inicial )
        resultado = array_para_operar.reduce((a, b) => a + b);
        break;
      case "resta":
        resultado = array_para_operar.reduce((a, b) => a - b);
        break;
      case "mult":
        resultado = array_para_operar.reduce((a, b) => a * b);
        break;
      case "div":
        resultado = array_para_operar.reduce((a, b) => a / b);
        break;
      default:
        break;
    }
    return (resultado == undefined) ? 'No existen el valores numericos o se pasaron mal los paramentros en el arreglo' : resultado ;
}
console.log(a(valores));
console.log(b(valores));
console.log(c(valores,'suma'));



