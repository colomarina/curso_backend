const app = require('express')()
const axios = require('axios')
const { normalize, schema, denormalize } = require('normalizr');

const authors = new schema.Entity('authors')


const mensaje = new schema.Entity('mensajes', {
  author: authors
})

// const autor = new schema.Entity('autores')
// const mensajes = new schema.Entity('mensajes',{
//   author: autor
// })




let articlesResponse ;

axios.get('http://localhost:3000/mensajes')
.then( response => {
  articlesResponse = response.data
})

app.get('/api/v1/mensajes' , (req, res) => {
  
  const normalizedData = normalize(articlesResponse, [mensaje])
  const denormalizedData = denormalize(normalizedData.result, [mensaje], normalizedData.entities)
  res.json(
    denormalizedData
  )
})

app.listen(3333, () => {
  console.log('Running')
})