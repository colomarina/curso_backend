const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: '',
      pass: ''
  }
});

const mailOptions = {
  from: 'Servidor Node.js',
  to: 'lucasmarina26@gmail.com',
  subject: 'Mail de prueba desde Node.js',
  html: '<h1>Contenido de prueba desde Node.js con Nodemailer</h1>'
}

transporter.sendMail(mailOptions,(err, info) => {
  if(err){
    console.log(err)
    return err
  }
  console.log(info)
})