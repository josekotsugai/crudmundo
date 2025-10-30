<?php
include 'conexão.php';

$id = $nm_cidades = $id_pais = '';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM cidades WHERE id_cidades = $id";
    $result = $conex->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $nm_cidades = $row['nm_cidades'];
        $id_pais = $row['id_pais'];
    } else {
        echo "Cidade não encontrada!";
        exit();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $nm_cidades = $_POST['nm_cidades'];
    $id_pais = $_POST['id_pais'];

    $sql = "UPDATE cidades SET nm_cidades='$nm_cidades' WHERE id_cidades=$id";

    if ($conex->query($sql) === TRUE) {
        header("Location: cidades.php?pais_id=" . $id_pais);
        exit();
    } else {
        echo "Erro: " . $sql . "<br>" . $conex->error;
    }
    
    $conex->close();
}

// Buscar dados do país para mostrar no título
$sql_pais = "SELECT * FROM paises WHERE id_paises = $id_pais";
$result_pais = $conex->query($sql_pais);
$pais = $result_pais->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Editar Cidade</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>Editar Cidade - <?php echo $pais['nm_pais']; ?></h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>
        
        <form method="post" action="editar_cidade.php">
            <input type="hidden" name="id" value="<?php echo htmlspecialchars($id); ?>">
            <input type="hidden" name="id_pais" value="<?php echo htmlspecialchars($id_pais); ?>">
            Nome da Cidade: <input type="text" name="nm_cidades" value="<?php echo htmlspecialchars($nm_cidades); ?>" required><br>
            <input type="submit" value="Atualizar">
        </form>
        
        <a href="cidades.php?pais_id=<?php echo $id_pais; ?>">Voltar para Cidades</a>
        <br>
        <a href="cadastro_cidade.php?pais_id=<?php echo $id_pais; ?>">Cadastrar Nova Cidade</a>
    </div>
</body>
</html>