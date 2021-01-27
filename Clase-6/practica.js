const fs = require('fs')

// Sincronicamente

// Guardar info en un archivo
// writeFileSync(ruta,lo que voy a guardar,opcional el formato que(por defecto 'utf-8'))
// si el archivo donde voy a guardar ya existe, lo sobreescribe!
// ./ significa donde este parado
//  fs.writeFileSync('./text.txt','Hola Colito !')

// Agregar informacion a un archivo
// appendFileSync(ruta,dato que voy a guardar,opcional el formato que(por defecto 'utf-8'))
// fs.appendFileSync('./text.txt','\nAgregue otra linea antes de eliminar')

// Leemos un archivo
// readFileSync(ruta,formato que voy a leer 'utf-8')
// const datos = fs.readFileSync('./text.txt','utf-8')
// console.log(datos)

// Eliminar un archivo
// unlinkSync(ruta)
// fs.unlinkSync('./text.txt')