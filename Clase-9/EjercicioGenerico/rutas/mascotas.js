const { POINT_CONVERSION_COMPRESSED } = require('constants')
var express = require('express')
var router = express.Router()

router.use(function timeLog(req,res,next) {
    console.log('Time: ',Date.now())
    next()    
})

router.get('/',(req,res)=>{
    res.send('Hola soy una mascota')
})

router.get('/nombre',(req,res)=>{
    res.send('Soy el colito')
})

module.exports = router