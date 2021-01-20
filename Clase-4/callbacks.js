const autores = [

    {
        id: 1,
        nombre: 'Pepito'
    },
    {
        id:2,
        nombre: 'Lucas'
    }
]

const libros = [
    {
        id:1,
        autorId:1,
        titulo: 'Don',
        precio:100
    },{
        id:2,
        autorId:2,
        titulo: 'Marina',
        precio:100
    },{
        id:3,
        autorId:1,
        titulo: 'Lipo',
        precio:100
    }
]

const getLibro = (id, callback) => {
    const libro = libros.find( libro => libro.id === id)
    if(!libro) {
        callback('No existe')
    } else {
        callback(null,libro)
    }
}

const getAutor = (libro,callback) => {
    const autor = autores.find(autor => autor.id === libro.autorId)
    if(!autor){
        callback('No hay autor')
    } else {
        callback(null, {
            libroId: libro.id,
            titulo: libro.titulo,
            autor: autor.nombre
        })
    }
}


getLibro(3 , (error,libro) =>{
    if(error){
        return console.log(error);
    }

    getAutor(libro, (error,respuesta) => {
        if(!error){
            return console.log(respuesta);
        }

        console.log(respuesta)
    })
})