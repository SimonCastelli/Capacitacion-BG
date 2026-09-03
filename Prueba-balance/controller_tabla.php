<?php
header("Content-Type: application/json");

$archivo = "usuarios_registrados.txt";
$action = $_GET['action'] ?? 'list';

if ($action == 'list') {
    $rows = [];
    if (file_exists($archivo)) {
        $lineas = file($archivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lineas as $idx => $linea) {
            $patron = '/^\[(.*?)\] DNI: (.*?) \| Nombre: (.*?) \| Grado: (.*?) \| Edad: (.*?) \| Fecha de nacimiento: (.*?) \| Genero: (.*?) \| Domicilio: (.*?)$/';
            
            preg_match($patron, $linea, $m);
            
            if ($m) {
                $item = [
                    "ID" => $idx,
                    "FechaRegistro" => trim($m[1]),
                    "DNI" => trim($m[2]),
                    "Nombre" => trim($m[3]),
                    "Grado" => trim($m[4]),
                    "Edad" => trim($m[5]),
                    "FechaNacimiento" => trim($m[6]),
                    "Genero" => trim($m[7]),
                    "Domicilio" => trim($m[8])
                ];

                if (!empty($_POST['dni']) && strpos($item['DNI'], $_POST['dni']) === false) continue;
                if (!empty($_POST['grado']) && $item['Grado'] !== $_POST['grado']) continue;

                $rows[] = $item;
            }
        }
    }
    echo json_encode(["Result" => "OK", "Records" => array_values($rows)]);
}

if ($action == 'delete') {
    $id = $_POST['ID'];
    $lineas = file($archivo);
    if (isset($lineas[$id])) {
        unset($lineas[$id]);
        file_put_contents($archivo, implode("", $lineas));
        echo json_encode(["Result" => "OK"]);
    } else {
        echo json_encode(["Result" => "ERROR", "Message" => "No se encontró el registro"]);
    }
}
?>