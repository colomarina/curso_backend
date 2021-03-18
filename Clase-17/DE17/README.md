# Primer Entrega del Trabajo Final

## Consigna:

- Sobre el desafío entregable de la última clase, cambiar la persistencia de los mensajes en el filesystem por persistencia en base de datos SQLite3
- Agregar una capa de persistencia en la Api Rest de productos utilizando el servicio de base de datos MYSQL
- Cumplir con todas las operaciones del CRUD: Select, Insert, Update, Delete

## Notas:

- Definir una carpeta DB para almacenar la base datos SQLite3 llamada mensajes y crear por programa la tabla de mensajes dentro de esta base si no existe.
- Crear la base de datos productos en MariaDB con MySQL Workbench y definir por programa la tabla de productos dentro de esta base si no existe.
- Utilizar la dependencia Knex para interactuar con la base de datos

# Soluciones

- Para crear la tabla productos en MYSQL utilice el siguiente SQL, lo hice manualmente por seguridad y corroborar que todo quede bien, ya que cuando intente creae la tabla con knex no logre ponerle clave primaria a el id

      CREATE TABLE `prueba`.`productos` ( `id` VARCHAR(100) NOT NULL , `timestamp` VARCHAR(100) NOT NULL , `nombre` VARCHAR(100) NOT NULL , `descripcion` VARCHAR(100) NOT NULL , `codigo` INT(50) NOT NULL , `foto` VARCHAR(100) NOT NULL , `stock` INT(20) NOT NULL , PRIMARY KEY (`id`))

- Para el crud los verifico con Postman, pero cree un vista para ver que los datos se hayan creado, actualizados o eliminados efectivamente por las dudas

# Consultas

- Deberia eliminar la clase productos? Es la que utilizaba para guardar los productos en el arrayu , pero ya teniendo las DB , seria innecesario tenerla

- En routes/productos.ts en el endpoint PATCH api/productos/:producto_id, aca deberia validar que esten todos los campos declarados y no nulos o undefined , asi la base no me da errores por las dudas no?

