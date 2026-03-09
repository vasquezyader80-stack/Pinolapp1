<?php
// api/repartidores.php
include_once 'config.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

if($metodo == 'GET'){
    // Ver pedidos que necesitan motorizado
    $query = "SELECT * FROM pedidos WHERE estado = 'Listo para entrega'";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if($metodo == 'POST'){
    // Cuando Joel acepta el pedido
    $query = "UPDATE pedidos SET repartidor_id = ?, estado = 'En camino' WHERE id = ?";
    $stmt = $conn->prepare($query);
    if($stmt->execute([$data->repartidor_id, $data->pedido_id])){
        echo json_encode(["status" => "success", "message" => "Pedido asignado"]);
    }
}
?>
