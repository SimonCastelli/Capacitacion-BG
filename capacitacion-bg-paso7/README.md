# Capacitación BG - Paso 7: Scaffold de API con Swagger

Proyecto base de ASP.NET Core (Minimal APIs) generado como punto de partida para practicar la puesta en marcha de una Web API con documentación Swagger antes de agregarle lógica propia.

## Descripción

Expone un único endpoint de ejemplo, `GET /weatherforecast`, que devuelve un pronóstico simulado con datos aleatorios — el endpoint estándar que trae la plantilla `dotnet new webapi`.

## Tecnologías

- .NET 8 / ASP.NET Core (Minimal APIs)
- Swashbuckle (Swagger / OpenAPI)

## Cómo ejecutar

```bash
dotnet run
```

Con la app corriendo, Swagger UI queda disponible en `/swagger`. También se incluye `CapacitacionBG-paso7.http` con un request de ejemplo.

## Requisitos

- .NET 8 SDK

## Parte de la capacitación que cubre

Configuración inicial de un proyecto ASP.NET Core con Swagger/OpenAPI: es el scaffold sobre el que luego se construyó la API con lógica de negocio propia (ver `capacitacion-bg-paso6`).
