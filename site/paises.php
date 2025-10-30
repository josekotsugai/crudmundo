<?php
include 'conexão.php';

$continente_id = $_GET['continente_id'];

// Buscar dados do continente
$sql_continente = "SELECT * FROM continentes WHERE id_continentes = $continente_id";
$result_continente = $conex->query($sql_continente);
$continente = $result_continente->fetch_assoc();

// Buscar países do continente
$sql_paises = "SELECT * FROM paises WHERE id_continente = $continente_id ORDER BY nm_pais";
$result_paises = $conex->query($sql_paises);
?>

<!DOCTYPE html>
<html>
<head>
    <title>CRUD Mundo - Países</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>Gerenciar Países - <?php echo $continente['nm_continente']; ?></h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>

        <!-- Link simples para adicionar país -->
        <a href="cadastro_pais.php?continente_id=<?php echo $continente_id; ?>">Cadastrar Novo País</a>

        <br><br>
        
        <!-- Tabela de países -->
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Nome do País</th>
                <th>Língua Falada</th>
                <th>Ações</th>
            </tr>

            <?php
            if ($result_paises->num_rows > 0) {
                while ($row = $result_paises->fetch_assoc()) {
                    echo "<tr>
                            <td>" . $row["id_paises"] . "</td>
                            <td>" . $row["nm_pais"] . "</td>
                            <td>" . $row["lingua_falada"] . "</td>
                            <td>
                                <a href='editar_pais.php?id=" . $row["id_paises"] . "'>Editar</a>
                                <a href='deletar_pais.php?id=" . $row["id_paises"] . "' onclick='return confirm(\"Tem certeza?\")'>Excluir</a>
                                <a href='cidades.php?pais_id=" . $row["id_paises"] . "'>Gerenciar Cidades</a>
                            </td>
                        </tr>";
                }
            } else {
                echo "<tr><td colspan='4'>Nenhum país cadastrado para este continente</td></tr>";
            }
            ?>
        </table>
        
        <br>
        <a href="index.php">Voltar para Continentes</a>
    </div>
</body>
</html>