const app = require('express')()
const fetch = require('node-fetch')
const logger = require('./utils/logger.util')
const redis = require('redis')

const redisClient = redis.createClient(6379)


getUsers = () => {
  return fetch('http://localhost:4000/user')
  .then(response => response.json())
  .then(users => users)
}

app.get('/api/v1/users', (req, res) => {
  logger.info('Inicio de la llamada')

  redisClient.get('users', (err, users) => {
    // if (err) {
    //   throw new Error()
    // }
    if (users) {
      res.status(200).json(JSON.parse(users))
      logger.info('Vino de Redis :)')
    } else {
      getUsers()
      .then(users => {
        redisClient.set('users', JSON.stringify(users), 'EX', 15)
        res.status(200).json(users)
        logger.info('No vino de Redis :(')
      })
    }

  })

})


app.listen(3000, () => {
  console.log('Running on 3000')
  redisClient.on('connect', () => {
    console.info('Connected : )')
  })
})