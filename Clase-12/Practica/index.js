const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http)

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    socket.broadcast.emit('mensaje', 'Desde el server')
    // console.log(socket)
    socket.on('mensaje del chat', (message) => {
        console.log(message)
        io.emit('mensaje del chat', message)
    })
})

io.on('disconnect', () => {
    console.log('Se desconecto')
})


http.listen(3000, () => {
    console.log('Running on port 3000')
})