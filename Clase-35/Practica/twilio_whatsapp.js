const client = require('twilio')(accountSid, authToken);

client.messages.create({
  body: 'Hola colito, soy un Whatsapp desde Node.js',
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+5492216408251'
})
  .then(message => console.log(message))
  .catch(console.log)