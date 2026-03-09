<?php
// api/tracking.php
header('Content-Type: application/json');
include 'config.php';

$pedido_id = $_GET['id'];

// Simulación de respuesta de base de datos
// En una app real, esto conectaría con la tabla de GPS del repartidor
echo json_encode([
    "pedido_id" => $pedido_id,
    "lat" => 12.1364, 
    "lng" => -86.2514,
    "estado" => "En camino",
    "repartidor" => "Joel M."
]);
?>
