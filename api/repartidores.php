<?php
// api/repartidores.php
include 'config.php';

// Endpoint para obtener repartidores activos en el mapa
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Simulación de consulta a la tabla 'repartidores'
    $repartidores = [
        ["id" => 1, "nombre" => "Juan Pérez", "moto" => "Honda Navi", "estado" => "En ruta"],
        ["id" => 2, "nombre" => "Luis García", "moto" => "Yamaha", "estado" => "Disponible"]
    ];
    echo json_encode($repartidores);
}
?>
  
