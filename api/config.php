<?php
// api/config.php
$host = "tu_host_aqui";
$db_name = "pinolapp_db";
$username = "tu_usuario";
$password = "tu_password";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    echo "Error de conexión: " . $exception->getMessage();
}
?>
