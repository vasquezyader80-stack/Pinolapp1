<?php
// api/pedidos.php
include_once 'config.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

if($metodo == 'POST'){
    // CREAR PEDIDO (Cuando Carlos toca el botón verde)
    $query = "INSERT INTO pedidos (usuario_id, restaurante_id, total, estado) VALUES (?, ?, ?, 'Recibido')";
    $stmt = $conn->prepare($query);
    
    if($stmt->execute([$data->usuario_id, $data->restaurante_id, $data->total])){
        echo json_encode(["status" => "success", "order_id" => $conn->lastInsertId()]);
    }
} 

elseif($metodo == 'GET'){
    // LEER PEDIDOS (Para el panel de admin y restaurante)
    $query = "SELECT * FROM pedidos ORDER BY id DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($pedidos);
}
?>
