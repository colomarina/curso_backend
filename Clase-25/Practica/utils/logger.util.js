const { createLogger, format, transports} = require('winston')

module.exports = createLogger({
  format: format.combine(
    format.colorize(),
    format.ms(),
    format.printf( (info) => {
      return `${info.level}: (${info.ms}) -> ${info.message}`
    })
  ),
  transports: [
    new transports.Console({
      level: 'debug'
    })
  ]
})