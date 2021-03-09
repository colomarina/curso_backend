const fs = require('fs')

// fs.readFile('./package.json','utf-8', (error, data) => {
//     if (error) {
//         console.log(error)
//         return
//     }

//     let info = {
//         contenidoStr: JSON.stringify(data),
//         contenidoObj: data,
//         size: getStat().size,
//     }

//     console.log(info);
// })

// const getStat = () => {
//     return fs.statSync('./package.json')
// }

// Con promesas

// fs.promises.writeFile('./path.txt', 'contenido')
// .then(data => {
//     console.log(data)
// })
// .catch(error => {
//     console.log(error)
// })

// Con ASYNC/AWAIT
const readFile = async () => {
    const data = await fs.promises.readFile('./path.txt', 'utf-8')
    console.log(data)
}
const guardarFile = async () => {
    const data = await fs.promises.writeFile('./path.txt','contenido')
    console.log(data)
}

guardarFile()
