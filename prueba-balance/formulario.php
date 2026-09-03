<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $nombre    = $_POST['nombre'] ?? 'N/A';
    $apellido  = $_POST['apellido'] ?? 'N/A';
    $dni       = $_POST['dni'] ?? 'N/A';
    $grado     = $_POST['grado'] ?? 'N/A';
    $genero    = $_POST['genero'] ?? 'N/A';
    $domicilio = $_POST['domicilio'] ?? 'N/A';
    $fecha     = $_POST['fecha'] ?? 'N/A';
    $edad      = $_POST['edad'] ?? 'N/A';

    $linea = "[$fecha] DNI: $dni | Nombre: $nombre $apellido | Grado: $grado | Edad: $edad | Fecha de nacimiento: $fecha | Genero: $genero | Domicilio: $domicilio" . PHP_EOL;

    $archivo_destino = "data/usuarios_registrados.txt";
    
    if (file_put_contents($archivo_destino, $linea, FILE_APPEND)) {
        $respuesta = [
            "status" => "success",
            "mensaje" => "¡Datos guardados con éxito en el archivo!",
            "detalle" => "Se ha registrado a $nombre $apellido."
        ];
    } else {
        $respuesta = [
            "status" => "error",
            "mensaje" => "No se pudo escribir en el archivo. Revisa los permisos."
        ];
    }

    echo json_encode($respuesta);

} else {
    echo json_encode([
        "status" => "error",
        "mensaje" => "Acceso denegado."
    ]);
}
?>