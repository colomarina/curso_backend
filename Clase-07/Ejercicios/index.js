const { response, request } = require('express');
const express = require('express')
const casual = require('casual')
const app = express();

app.use(express.json())

const users = []

for (let i = 0; i < 20; i++) {
    users.push({
        id: casual.uuid,
        username: casual.username,
        password: casual.password
    })
    
}

app.get('/', (request, response) => {
    response.send(users)
})
app.get('/:id', (request, response) => {
    console.log(request.params.id)
})

app.post('/', (request, response) => {
    console.log(request.body)
    users.unshift(request.body)
    response.sendStatus(200)
})

app.listen('3030', () => {
    console.log('El servidor esta arriba')
})