var express = require('express');
var multer = require('multer')
var app = express();
var router = express.Router();

// Definir storage
var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'uploads')
    },filename:function (req,file,cb) {
        cb(null,file.fieldname + '-' + Date.now())
    }
})
// Asignamos multer
var upload = multer({storage:storage});

app.post('/uploadFile',upload.single('myFile'),(req,res,next)=>{
    const file = req.file;

    if (!file) {
        const error = new Error('Elegi un archivo')
        error.httpStatusCode = 400
        next(error)
    }
    res.send(file)
})

app.use(express.urlencoded({extended:true}));
router.get('/help',(req,res)=>{
    res.send('Soy la ayuda de la aplicacion')
})

app.get('/subirarchivo',(req,res) => {
    res.sendFile(__dirname+'/index.html')
})


app.get('/diminombre',(req,res)=>{
    res.sendFile(__dirname+'/diminombre.html')
})

function verificar(req,res,next) {
    if (req.body.nombre === 'Lucas') {
        next()
    } else {
        res.status(500).send('Error de acceso!')
    }
}

app.post('/minombre',verificar,(req,res)=>{
    // console.log(req.body)
    res.send(`Hola ${req.body.nombre}, hay 3788 paginas oculta!!`)
})
app.use((req,res,next) => {
    console.log('Soy la etapa 1')//montado de manera global
    next()
})

app.get('/',(req,res)=>{
    console.log('Soy la etapa 2')//montado en la ruta '/'
    res.send('Hola soy la ruta principal del sistema')
})

app.use('/mascotas',require('./rutas/mascotas'));
app.use('/',router);

app.use('/fotos',express.static('public')) //Vincula /fotos al directirio /public, para acceder /fotos/imagen.xxx
app.use(express.static('public')) //Vincula directorio /public, para acceder /imagen.xxx

const server = app.listen(5050,()=>{
    console.log(`El servidor se encuentra en el puerto: ${server.address().port}`)
})