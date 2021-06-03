import nodemailer from 'nodemailer';

const transporterEthereal = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'markus3@ethereal.email',
      pass: 'wqwxNwJj1FtCKVzkxz'
  }
});

const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'lucasmarina26@gmail.com',
      pass: 'tu27LM96co'
  }
});

export {
  transporterEthereal,
  transporterGmail
}