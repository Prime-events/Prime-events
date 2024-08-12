<?php
require_once("db.class.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $con = new Database();
    $link = $con->getConexao();

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Verificar se o e-mail já existe no banco de dados
    $sqlVerificaEmail = "SELECT COUNT(*) as count FROM usuarios WHERE email = :email";
    $stmtVerificaEmail = $link->prepare($sqlVerificaEmail);
    $stmtVerificaEmail->bindParam(':email', $email);
    $stmtVerificaEmail->execute();
    $resultadoVerificaEmail = $stmtVerificaEmail->fetch(PDO::FETCH_ASSOC);

    if ($resultadoVerificaEmail['count'] > 0) {
        echo "<script>
            function showAlert() {
              alert('Usuário já existente.');
              setTimeout(function() {
                window.location.href = ' ../form.html'; // Redirecionar para a página inicial após 1 segundo
              }, 1000); // 1000 milissegundos = 1 segundo
            }
            showAlert();
          </script>";
    } else {
        // Se o e-mail não existe, proceder com o cadastro
        $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuarios (nome, email, senha)
                VALUES (:nome, :email, :senha)";
        try {
            $stmt = $link->prepare($sql);
            $stmt->bindParam(':nome', $nome);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':senha', $senha_hash);
            $stmt->execute();

            echo "<script>
            function showAlert() {
              alert('Usuário cadastrado com sucesso.');
              setTimeout(function() {
                window.location.href = ' ../form.html'; 
              }, 1000); // 1000 milissegundos = 1 segundo
            }
            showAlert();
          </script>";
            
        } catch(PDOException $e) {
            echo "Erro: " . $e->getMessage();
        }
    }
}
?>




