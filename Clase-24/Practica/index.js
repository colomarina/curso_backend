const app = require('express')()
const cookieParser = require('cookie-parser')
const session = require('express-session')


app.use(cookieParser())
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized:false
}))

const count = 0;

app.get('/', (req,res) => {
  if (!req.session.count) {
    req.session.count = 1
    res.cookie('claveCookie', 'colito').send('Bienvenido')
  } else {
    req.session.count++
    res.cookie('claveCookie', 'colito').send(`Esta es su visita ${req.session.count}`)
  }
})

app.get('/logout', (req,res) => {
  req.session.destroy(err => {
    if(!err){
      res.send('Chau')
    }
  })
})

app.get('/cookies', (req,res) => {
  console.log(req.cookies)
  res.send('oki')
})

app.get('/set', (req,res) => {
  const value = req.query.value;
  res.cookie('claveCookie', value).send('ahi va la cookie editada')
})

app.get('/clear-cookie', (req,res) => {
  const value = req.query.value;
  res.clearCookie('claveCookie').send(`Se elimino la cookie ${value}`)
})



app.listen(3000, () => {
  console.log('Running')
})