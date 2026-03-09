<?php
// api/config.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost"; // O el host de tu base de datos
$db_name = "pinolapp_db";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->exec("set names utf8");
} catch(PDOException $exception) {
    echo json_encode(["error" => "Error de conexión: " . $exception->getMessage()]);
    exit;
}
?>
