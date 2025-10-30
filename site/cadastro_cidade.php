<?php
include 'conexão.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nm_cidades = $_POST['nm_cidades'];
    $id_pais = $_POST['id_pais'];
    
    $sql = "INSERT INTO cidades (nm_cidades, id_pais) VALUES ('$nm_cidades', $id_pais)";
    
    if ($conex->query($sql) === TRUE) {
        header("Location: cidades.php?pais_id=" . $id_pais);
        exit();
    } else {
        echo "Erro: " . $sql . "<br>" . $conex->error;
    }
    
    $conex->close();
}

$pais_id = $_GET['pais_id'];
// Buscar dados do país para mostrar no título
$sql_pais = "SELECT * FROM paises WHERE id_paises = $pais_id";
$result_pais = $conex->query($sql_pais);
$pais = $result_pais->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Cadastrar Cidade</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>Cadastrar Nova Cidade - <?php echo $pais['nm_pais']; ?></h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>
        
        <form method="post" action="cadastro_cidade.php">
            <input type="hidden" name="id_pais" value="<?php echo $pais_id; ?>">
            Nome da Cidade: <input type="text" name="nm_cidades" required><br>
            <input type="submit" value="Cadastrar Cidade">
        </form>
        
        <a href="cidades.php?pais_id=<?php echo $pais_id; ?>">← Voltar para Cidades</a>
    </div>
</body>
</html>