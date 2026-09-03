# Capacitación BG - Paso 6: API de Licencias

API REST en ASP.NET Core (Minimal APIs) para gestionar licencias de empleados: alta, baja, modificación y consulta, con documentación interactiva vía Swagger.

## Descripción

Expone un CRUD sobre una entidad `Licencia` (id, nombre, provincia, días y año), manejada en memoria:

- `GET /HolaMundo` — endpoint de prueba.
- `GET /licencia/{id}` — devuelve una licencia junto con datos derivados (últimas letras del nombre, provincia invertida).
- `POST /licencia` — crea una licencia nueva, validando nombre y provincia.
- `PUT /licencia/{id}` — actualiza nombre y provincia de una licencia existente.
- `DELETE /licencia/{id}` — elimina una licencia.
- `GET /licencias` — devuelve la cantidad total de licencias cargadas.

## Tecnologías

- .NET 8 / ASP.NET Core (Minimal APIs)
- Swashbuckle (Swagger / OpenAPI)

## Cómo ejecutar

```bash
dotnet run
```

La app expone Swagger UI en `/swagger` para probar los endpoints desde el navegador. También se incluye `CapacitacionBG.http` con requests de ejemplo para usar con el cliente HTTP de VS Code / Visual Studio.

## Requisitos

- .NET 8 SDK

## Parte de la capacitación que cubre

Introducción a APIs REST con ASP.NET Core: definición de rutas, verbos HTTP (GET/POST/PUT/DELETE), validación básica de entrada y manejo de una colección en memoria.
