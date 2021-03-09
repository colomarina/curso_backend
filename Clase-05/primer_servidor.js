var http = require('http');
var server = http.createServer((req,res) => {
    let hora = new Date().getHours().toString();
    let mensaje;
    if (hora >= 6 && hora <= 12) {
        mensaje = "Buenos días";
    } else if (hora >= 13 && hora <= 19) {
        mensaje = "Buenas Tardes"
    } else {
        mensaje = "Buenas Noches"
    }
    res.end(mensaje);
})

server.listen(3333, function () {
    console.log(`Su servidor esta listo en el puerto ${this.address().port}`)
})