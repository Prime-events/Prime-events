<?php
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $dbnome = "PrimeEvents";

    $mysqli = new mysqli($servidor, $usuario, $senha, $dbnome);
    if($mysqli -> connect_errno){
        echo "Falha ao conectar: (" . $mysqli -> connect_errno . ")" . $mysqli -> connect_error; 
    }
?>