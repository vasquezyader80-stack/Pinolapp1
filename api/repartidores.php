<?php
// api/repartidores.php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data['accion'] == 'aprobar') {
    $id_motorizado = $data['id'];
    // Lógica SQL para cambiar estado a 'activo'
    echo json_encode(["status" => "ok", "msj" => "Motorizado aprobado para PinolApp"]);
}
?>
