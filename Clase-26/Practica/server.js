const express = require('express')
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session')

let usuarios = []

const app = express()
app.use(cookieParser())
app.use(session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout:'main.hbs'}));
app.set('view engine', '.hbs');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.get('/', (req,res) => {
    if(req.session.nombre) {
        res.redirect('/datos')
    }
    else {
        res.redirect('/login')
    }
})

/* --------- LOGIN ---------- */
app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.post('/login', (req,res) => {
    let { nombre, password } = req.body
    //console.log(usuarios)
    //console.log(req.body)
    let credencialesOk = usuarios.filter(usuario => usuario.nombre==nombre && usuario.password==password).length
    if(credencialesOk) {
        req.session.nombre = nombre
        req.session.contador = 0
        res.redirect('/')        
    }
    else {
        res.render('login-error', {});
    }
})

/* --------- REGISTER ---------- */
app.get('/register', (req,res) => {
    res.sendFile(__dirname + '/public/register.html')
})

app.post('/register', (req,res) => {
    let { nombre } = req.body
    let encontrado = usuarios.filter(usuario => usuario.nombre==nombre).length
    if(!encontrado) {
        usuarios.push(req.body)
        req.session.nombre = nombre
        req.session.contador = 0
        res.redirect('/')        
    }
    else {
        res.render('register-error', {});
    }
})

/* --------- DATOS ---------- */
app.get('/datos', (req,res) => {
    if(req.session.nombre) {
        req.session.contador++
        res.render('datos', {
            datos: usuarios.find(usuario => usuario.nombre == req.session.nombre),
            contador: req.session.contador
        });
    }
    else {
        res.redirect('/login')
    }
})

/* --------- LOGOUT ---------- */
app.get('/logout', (req,res) => {
    req.session.destroy( err => {
        res.redirect('/')
    })
})


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))
