<?php
// api/login.php
include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)){
    // Buscamos al usuario por correo y contraseña
    $query = "SELECT id, nombre, rol FROM usuarios WHERE correo = ? AND password = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->execute([$data->email, $data->password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if($user){
        echo json_encode(["status" => "success", "user" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Usuario o clave incorrectos"]);
    }
}
?>
