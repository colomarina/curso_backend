const fs = require('fs')

// TRY/CATCH

// try {
//     fs.writeFileSync('./fhy.txt',new Date().toString(), 'utf-8')
//     const data = fs.readFileSync('./fhy.txt','utf-8')

//     console.log(data)

// } catch (error) {
//     throw new Error(error)
// }

// CALLBACKS

// fs.writeFile('./callback.txt', 'Texto de prueba', error => {
//     if (error) {
//         console.log(error)
//         return
//     }
//     console.log('Guardado con éxito')
    
// })