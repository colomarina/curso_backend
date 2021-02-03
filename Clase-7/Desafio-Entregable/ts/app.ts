import express, {Application,Request, Response} from 'express';
import * as fs  from "fs";
// npm run dev para arrancar
const app:Application = express();

// Clases/Interface 
interface Items {
    items: Array<any>;
    cantidad: number;
}
interface Item {
    item: Object; //Prodia especificar que sea de Producto y crear una clase mas...
}
interface Items_Item {
    items: number; 
    item: number;
}
interface Visitas {
    visitas: Items_Item
}

// Variables de respuesta
let respuesta_1:Items = {
    items:[],
    cantidad:0
}
let respuesta_2:Item = {
    item:[]
}
let respuesta_3:Visitas = {
    visitas: {
        items: 0,
        item: 0
    }
}

// RUTAS

app.get('/',(req:Request,res:Response) => {
    res.send(`Probar con las rutas: /items, /items-random, /visitas`)
})

app.get('/items',(req:Request,res:Response) => {
    try {
        const dataFile:any = fs.readFileSync('./productos.txt','utf-8');
        let obj = JSON.parse(dataFile);
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (!respuesta_1.items.find((i: { id: number; }) => i.id === obj[key].id)) {
                    respuesta_1.items.push(obj[key])
                    respuesta_1.cantidad += 1
                }
            }
        }
        respuesta_3.visitas.items += 1;
    } catch (error) {
        console.log('Ups, algo ocurrio con la ruta /items')
    }
    res.send(`${JSON.stringify(respuesta_1)}`)
})

app.get('/item-random',(req:Request,res:Response) => {
    try {
        const dataFile:any = fs.readFileSync('./productos.txt','utf-8');
        let obj = JSON.parse(dataFile);
        let random = Math.floor(Math.random() * (obj.length-1)) + 1 ; // Se podria hacer una funcion , pero como lo utilizo 1 sola vez , decidi no hacerla
        respuesta_2.item = obj[random] ;
        respuesta_3.visitas.item += 1;
    } catch (error) {
        console.log('Ups, algo ocurrio con la ruta /item-random')
    }
    res.send(`${JSON.stringify(respuesta_2)}`)
})

app.get('/visitas',(req:Request,res:Response) => {
    res.send(`${JSON.stringify(respuesta_3)}`)
})




const puerto = 5000;

app.listen(puerto, () => {
    console.log(`Server listening ${puerto}`)
    
})