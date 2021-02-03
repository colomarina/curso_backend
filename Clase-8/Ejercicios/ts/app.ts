import express, {Application,Request, Response} from 'express';

// npm run dev para arrancar
const app:Application = express();

app.use(express.json())

let gatos:any[] = []

app.get('/gatos',(req,res) => {
    res.json(gatos)
})

app.post('/gatos',(req,res) => {
    const { id , nombre , raza , edad } = req.body
    const gato = {
        id,
        nombre,
        raza,
        edad
    }
    gatos.push(gato)
    res.sendStatus(201)
})

app.get('/gatos/:id', (req,res) => {
    const id = req.params.id
    const gato = gatos.find( gato => gato.id === id)
    if (!gato) {
        res.sendStatus(404)
    }
    res.json(gato)
})

app.patch('/gatos/:id/raza', (req,res) => {
    const id = req.params.id
    const gato = gatos.find( gato => gato.id === id)
    if (!gato) {
        res.sendStatus(404)
    }
    const { raza } = req.body
    gato.raza = raza
    res.sendStatus(204)
    
})

app.delete('/gatos/:id', (req,res) => {
    const id = req.params.id
    const gato = gatos.find( gato => gato.id === id)
    if (!gato) {
        res.sendStatus(404)
    }
    gatos = gatos.filter( gato => gato.id !== id)
    res.sendStatus(200)
})

// app.get('/',(req:Request,res:Response) => {
//     res.send({
//         params: req.params,
//         queryParams: req.query
//     })
// })
// app.post('/users',(req:Request,res:Response) => {
//     res.send({
//         params: req.params,
//         queryParams: req.query,
//         body: req.body
//     })
// })

const puerto = 3000;

app.listen(puerto, () => {
    console.log(`Server listening on port ${puerto}`)
})