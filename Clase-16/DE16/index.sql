-- 1. Crear una base de datos llamada 'prueba'
CREATE DATABASE prueba;

-- 2. Crear una tabla dentro de esa base con el nombre 'items' que contenga los siguientes campos:
--     - 'nombre' del tipo varchar no nulo
--     - 'categoria' del tipo varchar no nulo
--     - 'stock' del tipo entero sin signo
--     - 'id' clave primaria autoincremental no nula
CREATE TABLE `prueba`.`items` ( `id` INT(8) NOT NULL AUTO_INCREMENT , `nombre` VARCHAR(30) NOT NULL , `categoria` VARCHAR(30) NOT NULL , `stock` INT(8) NOT NULL , PRIMARY KEY (`id`))

-- 3. Insertar estos 3 registros en esa tabla
--     - Fideos, categoría:Harina, stock:20
--     - Leche, categoría:Lácteos, stock:30
--     - Crema, categoría:Lácteos, stock:15
INSERT INTO `items` (`id`, `nombre`, `categoria`, `stock`) VALUES (NULL, 'Fideos', 'Harina', '20')
INSERT INTO `items` (`id`, `nombre`, `categoria`, `stock`) VALUES (NULL, 'Leche', 'Lacteos', '30')
INSERT INTO `items` (`id`, `nombre`, `categoria`, `stock`) VALUES (NULL, 'Crema', 'Lacteos', '15')

-- 4. Listar los registros agregados
SELECT * FROM `items`

-- 5. Borrar el item con id = 1
DELETE FROM `items` WHERE id = 1

-- 6. Actualizar el stock del item con id = 2 a 45
UPDATE `items` SET `stock`= 45 WHERE `id` = 2

-- 7. Listar los registros comprobando que los datos estén actualizados según las acciones realizadas.
SELECT `stock` FROM `items` WHERE `id` = 2