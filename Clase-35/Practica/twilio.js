const client = require('twilio')(accountSid, authToken);

client.messages.create({
  body: 'Hola colito, soy un SMS desde Node.js',
  from: '+1612284207',
  to: '+54221640821'
})
.then(message => console.log(message))
.catch(console.log)