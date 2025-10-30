<?php
$hostname = "localhost";
$bancodedados = "crud_mundo"; 
$usuario = "root";
$senha = "";

$conex = new mysqli($hostname, $usuario, $senha, $bancodedados);

if ($conex->connect_errno) {
    echo "Erro de conexão: (" . $conex->connect_errno . ") " . $conex->connect_error;
}
?>