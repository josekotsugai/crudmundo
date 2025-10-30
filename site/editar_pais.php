<?php
include 'conexão.php';

$id = $nm_pais = $lingua_falada = $id_continente = '';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM paises WHERE id_paises = $id";
    $result = $conex->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $nm_pais = $row['nm_pais'];
        $lingua_falada = $row['lingua_falada'];
        $id_continente = $row['id_continente'];
    } else {
        echo "País não encontrado!";
        exit();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $nm_pais = $_POST['nm_pais'];
    $lingua_falada = $_POST['lingua_falada'];
    $id_continente = $_POST['id_continente'];

    $sql = "UPDATE paises SET nm_pais='$nm_pais', lingua_falada='$lingua_falada' WHERE id_paises=$id";

    if ($conex->query($sql) === TRUE) {
        header("Location: paises.php?continente_id=" . $id_continente);
        exit();
    } else {
        echo "Erro: " . $sql . "<br>" . $conex->error;
    }
    
    $conex->close();
}

// Buscar dados do continente para mostrar no título
$sql_continente = "SELECT * FROM continentes WHERE id_continentes = $id_continente";
$result_continente = $conex->query($sql_continente);
$continente = $result_continente->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Editar País</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>Editar País - <?php echo $continente['nm_continente']; ?></h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>
        
        <form method="post" action="editar_pais.php">
            <input type="hidden" name="id" value="<?php echo htmlspecialchars($id); ?>">
            <input type="hidden" name="id_continente" value="<?php echo htmlspecialchars($id_continente); ?>">
            Nome do País: <input type="text" name="nm_pais" value="<?php echo htmlspecialchars($nm_pais); ?>" required><br><br>
            Língua Falada: <input type="text" name="lingua_falada" value="<?php echo htmlspecialchars($lingua_falada); ?>" required><br><br>
            <input type="submit" value="Atualizar">
        </form>
        
        <a href="paises.php?continente_id=<?php echo $id_continente; ?>">Voltar para Países</a>
        <br>
        <a href="cadastro_pais.php?continente_id=<?php echo $id_continente; ?>">Cadastrar Novo País</a>
    </div>
</body>
</html>