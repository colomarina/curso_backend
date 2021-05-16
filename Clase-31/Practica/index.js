const winston = require('winston');

const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level: 'info'
    }),
    new winston.transports.File({
      level: 'warn',
      filename:'./logs/warn.log'
    }),
    new winston.transports.File({
      level: 'error',
      filename:'./logs/error.log'
    }),
  ]
}

const logger = winston.createLogger(logConfiguration)

logger.verbose('Hola Juan , es info')
logger.info('Hola Mundo , es info')
logger.warn('Alerta Mundo , es una alerta esto')
logger.error('Chau mundo , esto es un error')