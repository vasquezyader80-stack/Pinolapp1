<?php
// api/login.php
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$pass = $data['password'];

// Lógica para verificar en tu base de datos local
// Esto es el respaldo por si no se usa la autenticación de Supabase
if ($email == "admin@pinolapp.com" && $pass == "admin123") {
    echo json_encode([
        "status" => "success",
        "role" => "super_admin",
        "token" => "pinol_token_xyz"
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Credenciales incorrectas"]);
}
?>
