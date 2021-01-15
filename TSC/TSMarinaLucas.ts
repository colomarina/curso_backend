const operacionesModulo = './operaciones';

const operacion = async (num1: number, num2: number, operacion: string):Promise<any> => {
    let op = null;
    switch (operacion.toLowerCase()) {
        case 'suma':
            op = await import(operacionesModulo).then(n => n.Suma);
            break;
        case 'resta':
            op = await import(operacionesModulo).then(n => n.Resta);   
            break;
    
        default:
            return console.log(`${operacion} no es una operacion habilitada...`);
    }
    return new op(num1,num2).resultado();
}

const operaciones = async () => {
    const resultadoSuma = await operacion(3,2,'suma');
    const resultadoResta = await operacion(3,2,'resta');
    console.log(`El resultado de la suma es ${resultadoSuma} y el resultado de la resta es ${resultadoResta}`)
}

operaciones();

