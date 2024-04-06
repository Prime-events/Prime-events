<?php

require_once("db.class.php");
$con = new Database();
$link = $con -> getConexao();


$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

$sql = "INSERT INTO usuarios (nome, email, senha)
        VALUES (:nome, :email, :senha)";
    try{
        $stmt = $link->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha);
        $stmt->execute();

        echo "Cadastro feito com sucesso!";
        
    }catch(PDOException $e){
        echo "Erro: " . $e->getMessage();
    }
        






