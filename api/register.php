<?php
// api/register.php
include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->nombre) && !empty($data->email) && !empty($data->password)){
    $query = "INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, 'cliente')";
    $stmt = $conn->prepare($query);
    
    if($stmt->execute([$data->nombre, $data->email, $data->password])){
        echo json_encode(["status" => "success", "message" => "Cuenta creada con éxito"]);
    } else {
        echo json_encode(["status" => "error", "message" => "No se pudo crear la cuenta"]);
    }
}
?>
