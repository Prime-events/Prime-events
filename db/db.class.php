<?php

class Database{
    private $servidor;
    private $usuario;
    private $senha;
    private $dbnome;
    private $con;

    function __construct(){
        $this -> servidor = "localhost";
        $this -> usuario = "root";
        $this -> senha = "";
        $this -> dbnome = "testepe";
    }
    function getConexao(){
        try{
            $this -> con = new PDO(
                "mysql:host=$this->servidor;dbname=$this->dbnome",
                $this->usuario,
                $this->senha
            );

            $this -> con ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

            return $this -> con;

        }catch(Exception $e){
            echo $e->getMessage();
        }
    }    
}