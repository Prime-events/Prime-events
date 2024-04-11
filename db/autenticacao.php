<?php
session_start();

    require_once("db.class.php");
    $con = new Database();
    $link = $con->getConexao();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST['email'];
        $senha = $_POST['senha'];
    }

    $sql = "SELECT * FROM usuarios WHERE email = :email";
    $stmt = $link->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt -> execute();

    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);


    if ($resultado){
       if(password_verify($senha, $resultado['senha'])){
            $_SESSION["nome"] = $resultado['nome'];
            $_SESSION["loggedin"] = true;

            header("Location: ../dashboard.php");
            exit;

        }else {
            echo "Usuário ou senha estão incorretos!". "<br>";
        }
    }else{
        echo "Usuário não encontrado!";
    }

?>
