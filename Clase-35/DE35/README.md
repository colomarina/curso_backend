# Desafio Entregable 35

Faltaria subirlo a heroku , que es donde tengo problemas.

El mail de gmail dice adjuntar la foto de facebook , el problema es que no es una imagen lo que me da facebook, es un link que si lo abris te descarga la imagen de perfil. Entonces tome la decision de mandarle en el html , aunque esta comentado como seria si fuera un adjunto real de una foto.

Agregue Dotenv
Asi seria mi .env:

PORT=
MONGO_URL=
MONGO_SECRET_KEY=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
MAIL_ETHEREAL=
MAIL_ETHEREAL_PASSWORD=
MAIL_GMAIL=
MAIL_GMAIL_PASSWORD=
TWILIO_ACCOUNT_SID=
TWILIO_AUTHTOKEN=
TWILIO_FROM=
TWILIO_TO=

## Consigna

Realizar los siguientes cambios sobre el proyecto en el que venimos trabajando:

- El sistema debe enviar un mail, utilizando una cuenta de ethereal, que indique cuando un usuario se loguea (a través de la red social implementada anteriormente: de aquí en más Facebook). Así mismo debe proceder de la misma forma al desloguerse el usuario. 

- En ambos casos, el asunto del mail debe describir la operación (log in, log out) y el nombre del usuario junto a la fecha y hora del evento.

- Además, al momento del logueo se debe enviar un email similar, utilizando gmail como servidor de correo, a la cuenta de email registrada en Facebook ó alguna otra elegida. Se debe adjuntar la foto de perfil de la red social Facebook en el envío.

- El servidor también enviará un SMS a un número elegido, cada vez que reciba un mensaje con la palabra 'administrador' en el canal de chat, indicando quién lo envió y el texto completo del mensaje.

- En todos los casos revisar las distintas casillas de email verificando que los mails lleguen con los datos pedidos. También debe llegar de manera apropiada el SMS al celular indicado, revisar la consola de Twilio para validar el mensaje.



