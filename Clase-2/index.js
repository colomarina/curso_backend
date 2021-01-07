// ES7
// console.log(potenciacion([6,'**',2]))
// console.log(potenciacion(['**']))
// console.log(potenciacion([3,'**',3]))
// console.log(potenciacion([4,'**']))
// console.log(potenciacion([4,'**',5]))
// console.log(potenciacion([8,'**',2,'**']))
// console.log(potenciacion([4,'*=',5]))
function potenciacion(array) {
    return (array.includes('**', 1) && array.length === 3 && (typeof array[0] === 'number') && (typeof array[2] === 'number')) ? array[0] ** array[2] : null ;
}

// ES8
let persona = {
    nombre: 'Lucas',
    apellido: 'Marina',
    edad: 23,
};
function imprimirCada2Segundos(obj) {
    return new Promise((resolve) => {
        // Deberia ser con setInterval, pero probarlo
        // lo hice con setTimeOut para ver el resultado
        setTimeout(() => {
            resolve(Object.entries(obj));
        }, 2000)
    })
}
const correr = async function (x) {
    let a = await imprimirCada2Segundos(x);
    return a;
}
// correr(persona).then((v) => {
//     console.log(v);
// });

// ES9 falta no comprendo la consigna

const suma = function (array) {
    return [array.reduce((a,b) => a + b, 0)]
}

// console.log(suma([1,2,3,4]))

// ES10

class Mensaje {
    constructor(...args){
        try {
            this.mensaje = args[0];
            this.retardo = args[5];
        } catch (error){
            try {
                this.mensaje = args[0];
                this.retardo = 1;
            } catch (error) {
                this.mensaje = 'defina mensaje';
                this.retardo = 1;
            }
        }
    }

    mostrar(){
        return `${this.mensaje} ${this.retardo}`;
    }
}

let msj = new Mensaje('Hola',1);

console.log(msj.mostrar());