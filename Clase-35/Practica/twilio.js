const accountSid = 'ACea0fd4783d04917f2e731816bec6fba2';
const authToken = 'e71d764809dadb6e98651fd51e497573';

const client = require('twilio')(accountSid, authToken);

client.messages.create({
  body: 'Hola colito, soy un SMS desde Node.js',
  from: '+1612284207',
  to: '+54221640821'
})
.then(message => console.log(message))
.catch(console.log)