# Capacitación BG

Muestra de código de una capacitación de programación, organizada en distintas etapas: desde un formulario web clásico (HTML/JS/PHP) hasta APIs REST en .NET con documentación Swagger. Cada carpeta es un ejercicio independiente, autocontenido y con su propio README.

## Contenido

| Carpeta | Qué es | Stack |
|---|---|---|
| [`prueba-balance/`](./prueba-balance) | Formulario de registro con validación cliente/servidor y panel de administración con filtros y borrado | HTML, jQuery, Bootstrap, PHP |
| [`capacitacion-bg-paso7/`](./capacitacion-bg-paso7) | Scaffold inicial de una Web API con Swagger, punto de partida para practicar ASP.NET Core | .NET 8, ASP.NET Core, Swagger |
| [`capacitacion-bg-paso6/`](./capacitacion-bg-paso6) | API REST con CRUD completo (GET/POST/PUT/DELETE) sobre una entidad de negocio | .NET 8, ASP.NET Core, Swagger |

## Tecnologías

- **Frontend**: HTML5, JavaScript, jQuery, Bootstrap
- **Backend**: PHP, C# (.NET 8 / ASP.NET Core)
- **Documentación de APIs**: Swagger / OpenAPI

## Habilidades que se muestran

- Diseño y consumo de APIs REST (verbos HTTP, códigos de estado, validación de entrada).
- Integración frontend-backend vía AJAX/fetch.
- Validación de datos en dos capas (cliente y servidor).
- Persistencia simple sin base de datos (archivos como almacenamiento) y manejo de colecciones en memoria.
- Documentación de APIs con Swagger/OpenAPI.

## Cómo navegar el repo

Cada carpeta tiene su propio README con instrucciones puntuales para levantarla. En general:

- Los proyectos en C# se corren con `dotnet run` (requieren .NET 8 SDK).
- El proyecto en PHP se corre con `php -S localhost:8000` (requiere PHP).
