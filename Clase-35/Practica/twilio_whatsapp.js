const accountSid = 'ACea0fd4783d04917f2e731816bec6fba2';
const authToken = 'cbe1914f9e58abab479916ac068ac74c';
const client = require('twilio')(accountSid, authToken);

client.messages.create({
  body: 'Hola colito, soy un Whatsapp desde Node.js',
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+5492216408251'
})
  .then(message => console.log(message))
  .catch(console.log)