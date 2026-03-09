<?php
// api/register.php
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['nombre']) && isset($data['email'])) {
    // Aquí iría la lógica para insertar en la base de datos SQL
    // Se valida que el correo no exista y se encripta la contraseña
    echo json_encode([
        "status" => "success",
        "message" => "Usuario registrado correctamente en PinolApp"
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
}
?>
