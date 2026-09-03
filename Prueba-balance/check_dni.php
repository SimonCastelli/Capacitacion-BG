<?php
header("Content-Type: application/json");
$dniBusca = $_GET['dni'] ?? '';
$respuesta = ["existe" => false];
$archivo = "usuarios_registrados.txt";

if (file_exists($archivo) && !empty($dniBusca)) {
    $lineas = file($archivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lineas as $linea) {
        if (strpos($linea, "DNI: " . $dniBusca) !== false) {
            $respuesta["existe"] = true;
            break;
        }
    }
}
echo json_encode($respuesta);
?>