# Prueba Balance

Formulario web de registro de alumnos con validación en cliente y servidor, más un panel de administración para consultar, filtrar y eliminar los registros cargados.

## Descripción

El proyecto tiene dos pantallas:

- **`formulario.html`**: alta de un alumno (grado, nombre, apellido, DNI, edad, género, fecha de nacimiento, domicilio), con validación en tiempo real (bordes rojo/verde) y chequeo de DNI duplicado contra el backend antes de habilitar el envío.
- **`admin.html`**: panel de administración que lista los alumnos registrados en una tabla (jTable), permite filtrar por DNI/grado y eliminar registros de forma individual o en bloque.

No usa base de datos: los registros se persisten en un archivo de texto plano (`data/usuarios_registrados.txt`), que el backend en PHP lee, filtra y reescribe.

## Tecnologías

- **Frontend**: HTML5, jQuery, jQuery UI, Bootstrap 4, SweetAlert2, jTable
- **Backend**: PHP
- **Almacenamiento**: archivo de texto plano

## Estructura

```
prueba-balance/
├── formulario.html          # Formulario de alta
├── formulario.js             # Validación y envío del formulario
├── formulario.php            # Procesa el alta y escribe en data/
├── admin.html                 # Panel de administración
├── admin.js                   # Carga, filtrado y borrado de registros
├── check_dni.php              # Verifica si un DNI ya está registrado
├── controller_tabla.php       # Listado y borrado para el panel admin
└── data/
    └── usuarios_registrados.txt   # Registros guardados (datos de ejemplo)
```

## Cómo correrlo

Necesita un servidor con PHP (por ejemplo el servidor embebido):

```bash
php -S localhost:8000
```

Y abrir en el navegador:

- Formulario: `http://localhost:8000/formulario.html`
- Panel de administración: `http://localhost:8000/admin.html`

El servidor debe tener permisos de escritura sobre la carpeta `data/`.

## Parte de la capacitación que cubre

Ejercicio de integración frontend-backend "clásica" (sin frameworks del lado del servidor): formularios con validación en dos capas, llamadas AJAX, y un CRUD simple de lectura/borrado contra un almacenamiento en archivo en lugar de una base de datos.

> El archivo `data/usuarios_registrados.txt` contiene datos de ejemplo generados durante las pruebas del ejercicio, no información real de usuarios.
