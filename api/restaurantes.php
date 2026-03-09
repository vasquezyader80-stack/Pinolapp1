<?php
// api/restaurantes.php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Si viene una ciudad por parámetro, filtramos
    $ciudad = $_GET['ciudad'] ?? '';
    
    // Aquí la lógica SQL: "SELECT * FROM restaurantes WHERE ubicacion LIKE %$ciudad%"
    echo json_encode(["status" => "success", "data" => "Lista de negocios en $ciudad"]);
}
?>
