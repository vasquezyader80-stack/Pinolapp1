<?php
// api/restaurantes.php
include_once 'config.php';

$metodo = $_SERVER['REQUEST_METHOD'];

if($metodo == 'GET'){
    // Si mandamos un ID, vemos un restaurante. Si no, vemos todos.
    if(isset($_GET['id'])){
        $query = "SELECT * FROM restaurantes WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$_GET['id']]);
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
        $query = "SELECT * FROM restaurantes WHERE estado = 'abierto'";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    echo json_encode($resultado);
}
?>
