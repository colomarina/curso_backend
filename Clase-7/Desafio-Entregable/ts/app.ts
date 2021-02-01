import express, {Application,Request, Response} from 'express';
import * as fs  from "fs";
// npm run dev para arrancar
const app:Application = express();

interface Items {
    items: Array<any>;
    cantidad: number;
}
let respuesta_1:Items = {
    items:[],
    cantidad:0
}
// app.get('/',(req:Request,res:Response) => {
//     res.send('Hola hiciste GET')
// })

// app.get('/items',(req:Request,res:Response) => {
    const dataFile:any = fs.readFileSync('./productos.txt','utf-8');
    let obj = JSON.parse(dataFile);
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            respuesta_1.items.push(
                
            )
            respuesta_1.cantidad =+ 1
            const element = obj[key];
            // console.log(element.title)
        }
    }
    // console.log(obj[0].id)
    console.log(respuesta_1)
//     res.send(`Items: ${JSON.parse(dataFile)}`)
// })

// app.get('/item-random',(req:Request,res:Response) => {
//     res.send('Hola hiciste GET')
// })

// app.get('/visitas',(req:Request,res:Response) => {
//     res.send('Hola hiciste GET')
// })




// const puerto = 5000;

// app.listen(puerto, () => {
//     console.log(`Server listening ${puerto}`)
// })