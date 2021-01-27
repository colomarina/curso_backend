const fs = require('fs');

class Archivo {
    constructor(title,price,thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    async leer(url) {
        const data = await fs.promises.readFile(url,'utf-8')
        console.log(data)
    }

    async guardar() {

    }

    async borrar() {

    }
}

let archivo = new Archivo()