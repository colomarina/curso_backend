const accountSid = 'ACea0fd4783d04917f2e731816bec6fba2';
const authToken = 'e71d764809dadb6e98651fd51e497573';

const client = require('twilio')(accountSid, authToken);

const message = {
  body: 'Hola colito, soy un SMS desde Node.js',
  from: '+16122842307',
  to: '+542216408251'
}

const sendSMS = () => client.messages.create(message)

export {
  sendSMS
}