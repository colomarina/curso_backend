function random(min,max) {
    return Math.floor(Math.random() * (max-min)) + min ;
}

let obj = {}

for (let i = 0; i < 10; i++) {
    let numero = random(1,20);
    if (Object.keys(obj).includes(numero)) {
        obj[numero]++;
    } else {
        obj[numero] = 1
    }
}

// console.log(obj)

let productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]


