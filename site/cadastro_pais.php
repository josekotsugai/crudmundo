<?php
include 'conexão.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nm_pais = $_POST['nm_pais'];
    $lingua_falada = $_POST['lingua_falada'];
    $id_continente = $_POST['id_continente'];
    
    $sql = "INSERT INTO paises (nm_pais, lingua_falada, id_continente) VALUES ('$nm_pais', '$lingua_falada', $id_continente)";
    
    if ($conex->query($sql) === TRUE) {
        header("Location: paises.php?continente_id=" . $id_continente);
        exit();
    } else {
        echo "Erro: " . $sql . "<br>" . $conex->error;
    }
    
    $conex->close();
}

$continente_id = $_GET['continente_id'];
// Buscar dados do continente para mostrar no título
$sql_continente = "SELECT * FROM continentes WHERE id_continentes = $continente_id";
$result_continente = $conex->query($sql_continente);
$continente = $result_continente->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Cadastrar País</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>Cadastrar Novo País - <?php echo $continente['nm_continente']; ?></h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>
        
        <form method="post" action="cadastro_pais.php">
            <input type="hidden" name="id_continente" value="<?php echo $continente_id; ?>">
            Nome do País: <input type="text" name="nm_pais" required><br><br>
            Língua Falada: <input type="text" name="lingua_falada" required><br><br>
            <input type="submit" value="Cadastrar País">
        </form>
        
        <a href="paises.php?continente_id=<?php echo $continente_id; ?>">← Voltar para Países</a>
    </div>
</body>
</html>