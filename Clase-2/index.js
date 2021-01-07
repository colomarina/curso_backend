function potenciacion(array) {
    // let resultado = null;
    // if (array.includes('**', 1) && array.length === 3 && (typeof array[0] === 'number') && (typeof array[2] === 'number')) {
    //     resultado = true
    // }
    // return resultado;
    return (array.includes('**', 1) && array.length === 3 && (typeof array[0] === 'number') && (typeof array[2] === 'number')) ? array[0] ** array[2] : null
}

console.log(potenciacion([6,'**',2]))
console.log(potenciacion(['**']))
console.log(potenciacion([3,'**',3]))
console.log(potenciacion([4,'**']))
console.log(potenciacion([4,'**',5]))
console.log(potenciacion([8,'**',2,'**']))
console.log(potenciacion([4,'*=',5]))