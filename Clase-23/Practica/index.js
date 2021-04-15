const app = require('express')()
const axios = require('axios')

let articlesResponse ;

axios.get('http://localhost:3000/articles')
.then( response => {
  articlesResponse = response.data
})

app.get('/api/v1/articles' , (req, res) => {
  res.json(
    articlesResponse
  )
})

app.listen(3333, () => {
  console.log('Running')
})