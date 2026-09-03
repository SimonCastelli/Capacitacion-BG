using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var licencia = new List<Licencia>
{
    new Licencia { Id = 1, Nombre = "Simon", provincia = "Buenos Aires", dias = 10, anio = 2024 },
    new Licencia { Id = 2, Nombre = "Maria", provincia = "Cordoba", dias = 15, anio = 2024 },
    new Licencia { Id = 3, Nombre = "Juan", provincia = "Santa Fe", dias = 20, anio = 2024 },
    new Licencia { Id = 4, Nombre = "Ana", provincia = "Mendoza", dias = 5, anio = 2024 },
    new Licencia { Id = 5, Nombre = "Luis", provincia = "Tucuman", dias = 12, anio = 2024 },
    new Licencia { Id = 6, Nombre = "Sofia", provincia = "Salta", dias = 8, anio = 2024 }
};


app.MapGet("/HolaMundo", () => "Hola mundo.");

app.MapGet("/licencia/{id}", (int id) =>
 {
    var licenciaEncontrada = licencia.FirstOrDefault(l => l.Id == id);
    if (licenciaEncontrada == null)
    {
        return Results.NotFound("Licencia no encontrada");
    }
    string provinciaInv = new string(licenciaEncontrada.provincia.Reverse().ToArray());
    string ultimasletras = licenciaEncontrada.Nombre.Length >= 3
        ? licenciaEncontrada.Nombre.Substring(licenciaEncontrada.Nombre.Length - 3)
        : licenciaEncontrada.Nombre;
    return Results.Ok(new
    {
        Id = licenciaEncontrada.Id,        
        UltimasLetrasNombre = ultimasletras,
        ProvinciaInvertida = provinciaInv,
        Dias = licenciaEncontrada.dias,
        Anio = licenciaEncontrada.anio
    });
});

app.MapDelete("/licencia/{id}", (int id) =>
{
    var licenciaEncontrada = licencia.FirstOrDefault(l => l.Id == id);
    if (licenciaEncontrada == null)
    {
        return Results.NotFound("Licencia no encontrada");
    }
    licencia.Remove(licenciaEncontrada);
    return Results.Ok("Licencia eliminada");
});

app.MapPost("/licencia", ([FromBody] Licencia nuevaLicencia) =>
{
    if (nuevaLicencia == null || string.IsNullOrEmpty(nuevaLicencia.Nombre) || string.IsNullOrEmpty(nuevaLicencia.provincia))
    {
        return Results.BadRequest("Datos de licencia inválidos");
    }
    nuevaLicencia.Id = licencia.Count > 0 ? licencia.Max(l => l.Id) + 1 : 1;
    nuevaLicencia.dias = 0;
    nuevaLicencia.anio = DateTime.Now.Year;
    licencia.Add(nuevaLicencia);
    return Results.Created($"/licencia/{nuevaLicencia.Id}", nuevaLicencia);
});

app.MapPut("/licencia/{id}", (int id, [FromBody] Licencia licenciaActualizada) =>
{
    var licenciaEncontrada = licencia.FirstOrDefault(l => l.Id == id);
    if (licenciaEncontrada == null)
    {
        return Results.NotFound("Licencia no encontrada");
    }
    if (licenciaActualizada == null || string.IsNullOrEmpty(licenciaActualizada.Nombre) || string.IsNullOrEmpty(licenciaActualizada.provincia))
    {
        return Results.BadRequest("Datos de licencia inválidos");
    }
    licenciaEncontrada.Nombre = licenciaActualizada.Nombre;
    licenciaEncontrada.provincia = licenciaActualizada.provincia;
    return Results.Ok(licenciaEncontrada);
});

app.MapGet("/licencias", () => Results.Ok(licencia.Count));

app.Run();

public class Licencia
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string provincia { get; set; } = string.Empty;
    public int dias { get; set; }
    public int anio { get; set; }
}