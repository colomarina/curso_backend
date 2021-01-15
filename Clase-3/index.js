//Callback 
var getData = (callback) => {
    //setTimeOut es para simular pedido a api (algun fetch)
    setTimeout(()=>{
        callback({id:5,name:'lucas',edad:23})
    },2000)
}

let sumarEdad = (e) => {
    console.log(`La suma del id con la edad es ${e.id + e.edad}`);
}

// getData(sumarEdad)

//Ejercicio callback solicitado
let suma = (a,b) => a+b
let resta = (a,b) => a-b
let multiplicacion = (a,b) => a*b
let division = (a,b) => a/b

var operacion = (a,b,callback) => {
    console.log(callback(a,b));
}


// operacion(2,5,suma)
// operacion(2,5,resta)
