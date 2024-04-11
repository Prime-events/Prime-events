<?php
require_once("db.class.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $con = new Database();
    $link = $con->getConexao();

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (nome, email, senha)
            VALUES (:nome, :email, :senha)";
    try {
        $stmt = $link->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha_hash);
        $stmt->execute();

        echo "Cadastro feito com sucesso!";
        
    } catch(PDOException $e) {
        echo "Erro: " . $e->getMessage();
    }
}
?>




