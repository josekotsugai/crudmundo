<?php
include 'conexão.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nm_continente = $_POST['nm_continente'];
    
    $sql = "INSERT INTO continentes (nm_continente) VALUES ('$nm_continente')";
    
    if ($conex->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "Erro: " . $sql . "<br>" . $conex->error;
    }
    
    $conex->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Cadastrar Continente</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>Cadastrar Novo Continente</h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>
        
        <form method="post" action="cadastro.php">
            Nome do Continente: <input type="text" name="nm_continente" required><br>
            <input type="submit" value="Cadastrar Continente">
        </form>
        
        <a href="index.php">Voltar para Continentes</a>
    </div>
</body>
</html>