# Desafio Entregable 35

Cuando en el chat se mande un mensaje que contenga la palabra 'administrador' se debe mandar SMS a mi celu , quien envio ese mensaje y que decia el mensaje
(
const mensaje = 'Hola mundo como va 65876514 mnsgilb wndefau administrador'

const palabra = 'administrador'

const existe = mensaje.includes(palabra) ? 'Manda el mensaje' : '...'

console.log(existe)
)
## Consigna

Realizar los siguientes cambios sobre el proyecto en el que venimos trabajando:

- El sistema debe enviar un mail, utilizando una cuenta de ethereal, que indique cuando un usuario se loguea (a través de la red social implementada anteriormente: de aquí en más Facebook). Así mismo debe proceder de la misma forma al desloguerse el usuario. 

- En ambos casos, el asunto del mail debe describir la operación (log in, log out) y el nombre del usuario junto a la fecha y hora del evento.

- Además, al momento del logueo se debe enviar un email similar, utilizando gmail como servidor de correo, a la cuenta de email registrada en Facebook ó alguna otra elegida. Se debe adjuntar la foto de perfil de la red social Facebook en el envío.

- El servidor también enviará un SMS a un número elegido, cada vez que reciba un mensaje con la palabra 'administrador' en el canal de chat, indicando quién lo envió y el texto completo del mensaje.

- En todos los casos revisar las distintas casillas de email verificando que los mails lleguen con los datos pedidos. También debe llegar de manera apropiada el SMS al celular indicado, revisar la consola de Twilio para validar el mensaje.



