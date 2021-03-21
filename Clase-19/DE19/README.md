# Consigna: Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos

- Mensaje

      mail
      dateandhour
      message

- Producto

      id
      timestamp
      nombre
      descripcion
      codigo
      foto
      precio
      stock

## Ejercicios
1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 

2. Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

3. Listar todos los documentos en cada colección.

4. Mostrar la cantidad de documentos almacenados en cada una de ellas.

5. Realizar un CRUD sobre la coleccion de productos:
    1. Agregar un producto más en la colección de productos
    2. Realizar una consulta por nombre de producto específico:
        + i) Listar los productos con precio menor a 1000 pesos.
        + ii) Listar los productos con precio entre los 1000 a 3000 pesos.
        + iii) Listar los productos con precio mayor a 3000 pesos
        + iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
    3. Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
    4. Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
    5. Borrar los productos con precio menor a 1000 pesos
6. Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

# Soluciones!
1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 

2. Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

Mensajes

    > db.mensajes.insert({mail: "lucas@gmail.com", dateandhour: "21/3/2021 1:24:2", message:"Hola coder"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "flor@gmail.com", dateandhour: "21/3/2021 1:25:28", message:"Hola, como estas?"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "lucas@gmail.com", dateandhour: "21/3/2021 1:25:59", message:"Bien y vos?"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "flor@gmail.com", dateandhour: "21/3/2021 1:26:9", message:"Me alegro"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "flor@gmail.com", dateandhour: "21/3/2021 1:26:19", message:"Que contas?"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "lucas@gmail.com", dateandhour: "21/3/2021 1:27:1", message:"Haciendo el desafio de coderhouse!"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "lucas@gmail.com", dateandhour: "21/3/2021 1:27:15", message:"Muy divertido y aprendiendo muchisimo!"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "lucas@gmail.com", dateandhour: "21/3/2021 1:27:42", message:"Vos que andas haciendo?"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "flor@gmail.com", dateandhour: "21/3/2021 1:28:11", message:"Aburrida mirando netflix!"})
    WriteResult({ "nInserted" : 1 })
    > db.mensajes.insert({mail: "flor@gmail.com", dateandhour: "21/3/2021 1:28:51", message:"Suerte en tu desafio!"})
    WriteResult({ "nInserted" : 1 })

Productos

    db.productos.insertMany([
      {
        timestamp: 1616044433806,
        nombre: "Fideos",
        descripcion: "Descripcion de los fideos",
        codigo: 100,
        foto: "url_foto.png",
        precio: 120,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Galletitas",
        descripcion: "Descripcion de las galletitas",
        codigo: 101,
        foto: "url_foto.png",
        precio: 580,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Leche",
        descripcion: "Descripcion de la leche",
        codigo: 102,
        foto: "url_foto.png",
        precio: 900,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Pan",
        descripcion: "Descripcion del pan",
        codigo: 103,
        foto: "url_foto.png",
        precio: 1280,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Arvejas",
        descripcion: "Descripcion de las arvejas",
        codigo: 104,
        foto: "url_foto.png",
        precio: 1700,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Lechuga",
        descripcion: "Descripcion de la lechuga",
        codigo: 105,
        foto: "url_foto.png",
        precio: 2300,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Tostadas de arroz",
        descripcion: "Descripcion de las tostadas de arroz",
        codigo: 106,
        foto: "url_foto.png",
        precio: 2860,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Queso",
        descripcion: "Descripcion del queso",
        codigo: 107,
        foto: "url_foto.png",
        precio: 3350,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Banana",
        descripcion: "Descripcion de la banana",
        codigo: 108,
        foto: "url_foto.png",
        precio: 4320,
        stock: 100
      },
      {
        timestamp: 1616044433806,
        nombre: "Agua",
        descripcion: "Descripcion del agua",
        codigo: 109,
        foto: "url_foto.png",
        precio: 4990,
        stock: 100
      }
    ])
    {
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("6056d27731c3fab5b1078a00"),
                ObjectId("6056d27731c3fab5b1078a01"),
                ObjectId("6056d27731c3fab5b1078a02"),
                ObjectId("6056d27731c3fab5b1078a03"),
                ObjectId("6056d27731c3fab5b1078a04"),
                ObjectId("6056d27731c3fab5b1078a05"),
                ObjectId("6056d27731c3fab5b1078a06"),
                ObjectId("6056d27731c3fab5b1078a07"),
                ObjectId("6056d27731c3fab5b1078a08"),
                ObjectId("6056d27731c3fab5b1078a09")
        ]
    }

3. Listar todos los documentos en cada colección.

        > db.mensajes.find()
        { "_id" : ObjectId("6056ca9e72339d1cf1b2d99b"), "mail" : "lucas@gmail.com", "dateandhour" : "21/3/2021 1:24:2", "message" : "Hola coder" }
        { "_id" : ObjectId("6056cac172339d1cf1b2d99c"), "mail" : "flor@gmail.com", "dateandhour" : "21/3/2021 1:25:28", "message" : "Hola, como estas?" }
        { "_id" : ObjectId("6056cada72339d1cf1b2d99d"), "mail" : "lucas@gmail.com", "dateandhour" : "21/3/2021 1:25:59", "message" : "Bien y vos?" }
        { "_id" : ObjectId("6056caee72339d1cf1b2d99e"), "mail" : "flor@gmail.com", "dateandhour" : "21/3/2021 1:26:9", "message" : "Me alegro" }
        { "_id" : ObjectId("6056caff72339d1cf1b2d99f"), "mail" : "flor@gmail.com", "dateandhour" : "21/3/2021 1:26:19", "message" : "Que contas?" }
        { "_id" : ObjectId("6056cb1a72339d1cf1b2d9a0"), "mail" : "lucas@gmail.com", "dateandhour" : "21/3/2021 1:27:1", "message" : "Haciendo el desafio de coderhouse!" }
        { "_id" : ObjectId("6056cb3372339d1cf1b2d9a1"), "mail" : "lucas@gmail.com", "dateandhour" : "21/3/2021 1:27:15", "message" : "Muy divertido y aprendiendo muchisimo!" }
        { "_id" : ObjectId("6056cb4e72339d1cf1b2d9a2"), "mail" : "lucas@gmail.com", "dateandhour" : "21/3/2021 1:27:42", "message" : "Vos que andas haciendo?" }
        { "_id" : ObjectId("6056cb6b72339d1cf1b2d9a3"), "mail" : "flor@gmail.com", "dateandhour" : "21/3/2021 1:28:11", "message" : "Aburrida mirando netflix!" }
        { "_id" : ObjectId("6056cb8172339d1cf1b2d9a4"), "mail" : "flor@gmail.com", "dateandhour" : "21/3/2021 1:28:51", "message" : "Suerte en tu desafio!" }
        > db.productos.find()
        { "_id" : ObjectId("6056d27731c3fab5b1078a00"), "timestamp" : 1616044433806, "nombre" : "Fideos", "descripcion" : "Descripcion de los fideos", "codigo" : 100, "foto" : "url_foto.png", "precio" : 120, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a01"), "timestamp" : 1616044433806, "nombre" : "Galletitas", "descripcion" : "Descripcion de las galletitas", "codigo" : 101, "foto" : "url_foto.png", "precio" : 580, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a02"), "timestamp" : 1616044433806, "nombre" : "Leche", "descripcion" : "Descripcion de la leche", "codigo" : 102, "foto" : "url_foto.png", "precio" : 900, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a03"), "timestamp" : 1616044433806, "nombre" : "Pan", "descripcion" : "Descripcion del pan", "codigo" : 103, "foto" : "url_foto.png", "precio" : 1280, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a04"), "timestamp" : 1616044433806, "nombre" : "Arvejas", "descripcion" : "Descripcion de las arvejas", "codigo" : 104, "foto" : "url_foto.png", "precio" : 1700, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a05"), "timestamp" : 1616044433806, "nombre" : "Lechuga", "descripcion" : "Descripcion de la lechuga", "codigo" : 105, "foto" : "url_foto.png", "precio" : 2300, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a06"), "timestamp" : 1616044433806, "nombre" : "Tostadas de arroz", "descripcion" : "Descripcion de las tostadas de arroz", "codigo" : 106, "foto" : "url_foto.png", "precio" : 2860, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a07"), "timestamp" : 1616044433806, "nombre" : "Queso", "descripcion" : "Descripcion del queso", "codigo" : 107, "foto" : "url_foto.png", "precio" : 3350, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a08"), "timestamp" : 1616044433806, "nombre" : "Banana", "descripcion" : "Descripcion de la banana", "codigo" : 108, "foto" : "url_foto.png", "precio" : 4320, "stock" : 100 }
        { "_id" : ObjectId("6056d27731c3fab5b1078a09"), "timestamp" : 1616044433806, "nombre" : "Agua", "descripcion" : "Descripcion del agua", "codigo" : 109, "foto" : "url_foto.png", "precio" : 4990, "stock" : 100 }


4. Mostrar la cantidad de documentos almacenados en cada una de ellas.

        > db.mensajes.count()
        10
        > db.productos.count()
        10

5. Realizar un CRUD sobre la coleccion de productos:
    1. Agregar un producto más en la colección de productos

            > db.productos.insertOne({
            ...   "timestamp": 1616044433806,
            ...   "nombre": "Papas Fritas",
            ...   "descripcion": "Descripcion de las papas fritas",
            ...   "codigo": 100,
            ...   "foto": "url_foto.png",
            ...   "precio": 890,
            ...   "stock": 100
            ... })
            {
                    "acknowledged" : true,
                    "insertedId" : ObjectId("6056d49b31c3fab5b1078a0a")
            }
    2. Realizar una consulta por nombre de producto específico:
        + i) Listar los productos con precio menor a 1000 pesos.

                > db.productos.find({precio: {$lt: 1000}}).pretty()
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a00"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Fideos",
                        "descripcion" : "Descripcion de los fideos",
                        "codigo" : 100,
                        "foto" : "url_foto.png",
                        "precio" : 120,
                        "stock" : 100
                }
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a01"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Galletitas",
                        "descripcion" : "Descripcion de las galletitas",
                        "codigo" : 101,
                        "foto" : "url_foto.png",
                        "precio" : 580,
                        "stock" : 100
                }
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a02"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Leche",
                        "descripcion" : "Descripcion de la leche",
                        "codigo" : 102,
                        "foto" : "url_foto.png",
                        "precio" : 900,
                        "stock" : 100
                }
                {
                        "_id" : ObjectId("6056d49b31c3fab5b1078a0a"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Papas Fritas",
                        "descripcion" : "Descripcion de las papas fritas",
                        "codigo" : 100,
                        "foto" : "url_foto.png",
                        "precio" : 890,
                        "stock" : 100
                }

        + ii) Listar los productos con precio entre los 1000 a 3000 pesos.
                
                > db.productos.find({$and:[{precio: {$gte:1000}},{precio: {$lte:3000}}]}).pretty()
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a03"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Pan",
                        "descripcion" : "Descripcion del pan",
                        "codigo" : 103,
                        "foto" : "url_foto.png",
                        "precio" : 1280,
                        "stock" : 100
                }
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a04"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Arvejas",
                        "descripcion" : "Descripcion de las arvejas",
                        "codigo" : 104,
                        "foto" : "url_foto.png",
                        "precio" : 1700,
                        "stock" : 100
                }
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a05"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Lechuga",
                        "descripcion" : "Descripcion de la lechuga",
                        "codigo" : 105,
                        "foto" : "url_foto.png",
                        "precio" : 2300,
                        "stock" : 100
                }
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a06"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Tostadas de arroz",
                        "descripcion" : "Descripcion de las tostadas de arroz",
                        "codigo" : 106,
                        "foto" : "url_foto.png",
                        "precio" : 2860,
                        "stock" : 100
                }
        + iii) Listar los productos con precio mayor a 3000 pesos
                
                > db.productos.find({precio: {$gt:3000}}).pretty()
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a07"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Queso",
                        "descripcion" : "Descripcion del queso",
                        "codigo" : 107,
                        "foto" : "url_foto.png",
                        "precio" : 3350,
                        "stock" : 100
                }
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a08"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Banana",
                        "descripcion" : "Descripcion de la banana",
                        "codigo" : 108,
                        "foto" : "url_foto.png",
                        "precio" : 4320,
                        "stock" : 100
                }
                {
                        "_id" : ObjectId("6056d27731c3fab5b1078a09"),
                        "timestamp" : 1616044433806,
                        "nombre" : "Agua",
                        "descripcion" : "Descripcion del agua",
                        "codigo" : 109,
                        "foto" : "url_foto.png",
                        "precio" : 4990,
                        "stock" : 100
                }
        + iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
                
                > db.productos.find({},{"nombre":1}).sort({precio: 1}).skip(2).limit(1)
                { "_id" : ObjectId("6056d49b31c3fab5b1078a0a"), "nombre" : "Papas Fritas" }
    3. Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.(Como los cree con 100, sin saber este punto, modifique el stock a 200)
            
            > db.productos.updateMany({},{$set: {"stock":200}})
            { "acknowledged" : true, "matchedCount" : 11, "modifiedCount" : 11 }
    4. Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
            
            > db.productos.updateMany({precio: {$gte:4000}},{$set: {"stock":0}})
            { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
    5. Borrar los productos con precio menor a 1000 pesos
            
            > db.productos.deleteMany({precio: {$lt:1000}})
            { "acknowledged" : true, "deletedCount" : 4 }
            
6. Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.