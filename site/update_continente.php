<?php
include 'conexão.php';

$id = $nm_continente = '';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM continentes WHERE id_continentes = $id";
    $result = $conex->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $nm_continente = $row['nm_continente'];
    } else {
        echo "Continente não encontrado!";
        exit();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $nm_continente = $_POST['nm_continente'];

    $sql = "UPDATE continentes SET nm_continente='$nm_continente' WHERE id_continentes=$id";

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
    <title>Editar Continente</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>Editar Continente</h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>
        
        <form method="post" action="update_continente.php">
            <input type="hidden" name="id" value="<?php echo htmlspecialchars($id); ?>">
            Nome do Continente: <input type="text" name="nm_continente" value="<?php echo htmlspecialchars($nm_continente); ?>" required><br>
            <input type="submit" value="Atualizar">
        </form>
        
        <a href="index.php">Voltar para Continentes</a>
        <br>
        <a href="cadastro_continente.php">Cadastrar Novo Continente</a>
        <br>
        <a href="paises.php?continente_id=<?php echo $id; ?>">Gerenciar Países deste Continente</a>
    </div>
</body>
</html>