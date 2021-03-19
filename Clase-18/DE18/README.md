# Consigna: Mediante en uso del cliente MySQL Workbench realizar las siguientes tareas:

1. Crear una base de datos llamada 'prueba'

        use prueba

2. Crear una colección dentro de esa base con el nombre 'items' que contenga los siguientes campos:
    - 'nombre' del tipo varchar no nulo
    - 'categoria' del tipo varchar no nulo
    - 'stock' del tipo entero sin signo
    - 'id' clave primaria autoincremental no nula

3. Insertar estos 3 registros en esa tabla
    - Fideos, categoría:Harina, stock:20
    - Leche, categoría:Lácteos, stock:30
    - Crema, categoría:Lácteos, stock:15        

          Punto 2 y 3, los soluciones juntos
          db.items.insert({nombre: 'Fideos',categoria: 'Harina',stock: 20})
          db.items.insert({nombre: 'Leche',categoria: 'Lacteos',stock: 30})
          db.items.insert({nombre: 'Crema',categoria: 'Lacteos',stock: 15})

4. Listar los registros agregados

        db.items.find()


