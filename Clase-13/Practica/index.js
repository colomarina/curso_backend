import { express } from "express";


const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    
})


const port = 8080;
http.listen(port,()=>{
   console.log(`El servidor se encuentra en el puerto: 8080`)    
})