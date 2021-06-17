const request = require('request')

request('http://localhost:8080/api', (error, response, body) => {
    console.log('error', error)
    console.log('status code', response? response.statusCode: '???')
    console.log('body', JSON.parse(body))
})

request('http://www.google.com', (error, response, body) => {
    console.log('error', error)
    console.log('status code', response? response.statusCode: '???')
    console.log('body', body)
})

