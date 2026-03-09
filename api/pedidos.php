<?php
// api/pedidos.php
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Aquí procesamos el pedido en Córdobas
    $cliente = $data['cliente_id'];
    $total = $data['total'];
    $items = $data['productos']; // Array de lo que pidió (Baho, Cerveza, etc.)

    // Lógica para insertar en Supabase o SQL local
    echo json_encode([
        "status" => "success",
        "message" => "Pedido recibido",
        "order_id" => rand(10000, 99999)
    ]);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Para que el Admin o el Restaurante consulten los pedidos
    echo json_encode(["pedidos_activos" => []]);
}
?>
