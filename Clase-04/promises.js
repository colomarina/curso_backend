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

// const titulos = libros.pipe(
//     map( libro => libro.titulo )
// )
// 
// titulos.subscribe( data => console.log(data))

const getLibro = async (id) => {
    
    const libro = libros.find( libro => libro.id === id)
    if(!libro) {
        throw new Error('No existe')
    } else {
        return libro
    }
    
        
}

const getAutor = async (libro) => {
    
    const autor = autores.find(autor => autor.id === libro.autorId)
    if(!autor){
        throw new Error('No hay autor')
    } else {
        return {
            libroId: libro.id,
            titulo: libro.titulo,
            autor: autor.nombre
        }
    }
    
}


// getLibro(2)
// .then( libro => getAutor(libro) )
// .then( response => console.log(response) )
// .catch( console.log )

const getLibroInfo = async (libroId) => {
    try {
        const libro = await getLibro(libroId);
        const response = await getAutor(libro);
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

getLibroInfo(2)