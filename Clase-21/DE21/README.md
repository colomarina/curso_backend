# Segunda Entrega del Proyecto Final

## Consigna

Deberás entregar el estado de avance de tu aplicación eCommerce Backend, agregando 7 tipos de persistencia de datos:

1) File System (fs)
2) MySQL/MariaDB local
3) MySQL/MariaDB DBaaS
4) SQLite3
5) MongoDB Local
6) MongoDB DBaaS
7) Firebase


## Aspectos a incluir en el entregable 

1) Implementarás en cada tipo el CRUD correspondiente a los procesos anteriormente desarrollados, con persistencia en memoria.
2) La funcionalidad de persistencia para todos estos casos debe ser realizada utilizando clases con interfaz única (los nombres de los métodos comunes deben ser iguales). Cada clase representará un tipo de persistencia. 
3) Incluir dentro de estos tipos la ya realizada en memoria (Tipo 0).
4) Para seleccionar el modo de persistencia operativa, crear una clase o función que actúe como 'Fábrica ó Factory': recibirá el 'número' de persistencia (1 al 7 y 0 para memoria) y devolverá el objeto correspondiente para el uso por parte del controlador o lógica de negocio en cada caso de uso (carrito o lista de productos).
5) Estas clases, llamadas DAO (Data Access Object), implementarán los métodos de conexión hacia cada base, así como los 4 métodos CRUD: Create (insert), Read (leer con o sin filtro), Update: (actualizar), Delete (borrar) y los métodos auxiliares que se consideren incorporar.
6) Estas clases, llamadas DAO (Data Access Object), implementarán los métodos de conexión hacia cada base, así como los 4 métodos CRUD: Create (insert), Read (leer con o sin filtro), Update (actualizar), Delete (borrar) y los métodos auxiliares que se consideren incorporar.
7) La selección de la capa de persistencia activa se hará a través de una variable global, a la cual se le asignará una constante. El nombre de dicha constante corresponderá al tipo de persistencia y se inicializará con el número correspondiente.
8) En la vista de productos incorporar filtros mediante los cuales el cliente pueda determinar qué información desea ver. Estos filtros responderán a los siguientes campos: 
- nombre : el nombre del producto debe coincidir exactamente
- precio : por rango de precio
La información será filtrada del lado backend en la operación de lectura hacia la base.

# Respuestas

	Elegi usar MongoDB Local

	Filtros Agregados

	/productos_vista/?nombre=Agu
	/productos_vista/?min_precio=1000&max_precio=3000



