const moment = require('moment')

const now = moment()
const cumple = moment('26061997','DD/MM/YYYY')

console.log(`Hoy es ${now.format('DD/MM/YYYY')}`)
console.log(`Nací el ${cumple.format('DD/MM/YYYY')}`)
console.log(`Desde mi nacimiento han pasado ${now.diff(cumple, 'years')} años`)
