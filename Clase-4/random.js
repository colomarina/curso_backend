function randomNumber(numMin, numMax, cant) {
    let index = 0
    return {
        next: function () {
            return index < cant ? {
                value: {
                    orden: index++,
                    number: Math.random() * (numMax - numMin) + numMin,
                    date: new Date()
                },
                done: false
            } : {
                done: true
            }
        }
    }
}

let x = randomNumber(1,10,2)

// console.log(x.next())


function* randomNum(numMin, numMax, cant) {
    let index = 0

    while (index < cant) {
        // yield palabra reservada
        yield {
            orden: index++,
            number: Math.random() * (numMax - numMin) + numMin,
            date: new Date()
        }
    }
}

let y = randomNum(1,10,2);

console.log(y.next())
console.log(y.next())
console.log(y.next())