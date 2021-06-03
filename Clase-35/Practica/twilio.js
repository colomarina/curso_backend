const client = require('twilio')(accountSid, authToken);

client.messages.create({
  body: 'Hola colito, soy un SMS desde Node.js',
  from: '+16122842307',
  to: '+542216408251'
})
.then(message => console.log(message))
.catch(console.log)