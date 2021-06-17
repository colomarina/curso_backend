import axios from 'axios';

// const config

const traerProductos = () => {
  axios.get('http://localhost:8080/api/productos')
    .then( response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}
console.log('hoola')
setInterval(traerProductos, 20000)
traerProductos()