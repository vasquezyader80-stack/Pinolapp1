<?php
// api/tracking.php
include_once 'config.php';

if(isset($_GET['order_id'])){
    $query = "SELECT p.estado, r.nombre as motorizado, r.telefono 
              FROM pedidos p 
              LEFT JOIN repartidores r ON p.repartidor_id = r.id 
              WHERE p.id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$_GET['order_id']]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
}
?>
