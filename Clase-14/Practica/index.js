class Perro {
    constructor(nombre, raza) {
        this.nombre = nombre
        this.raza = raza
    }

    getNombre() {
        return this.nombre
    }
    getRaza() {
        return this.raza
    }
}

const perro = new Perro('Yago', ' mestizo')

const nombre = perro.getNombre()
const raza = perro.getRaza()

let presentarPerro = (nombre, raza) => {
    console.log(`Mi perro se llama ${nombre} y su raza es ${raza}`)
}

presentarPerro(nombre, raza)