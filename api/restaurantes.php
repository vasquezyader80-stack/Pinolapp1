<?php
// api/restaurantes.php
include 'config.php';

// Consultar todos los restaurantes activos en Nicaragua
$sql = "SELECT * FROM restaurantes WHERE estado = 'activo'";
// Aquí iría la ejecución de la consulta SQL...

echo json_encode($lista_restaurantes);
?>
