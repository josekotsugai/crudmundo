<?php
include 'conexão.php';

// Buscar continentes
$sql_continentes = "SELECT * FROM continentes ORDER BY nm_continente";
$result_continentes = $conex->query($sql_continentes);
?>

<!DOCTYPE html>
<html>
<head>
    <title>CRUD Mundo - Continentes</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>CRUD Mundo - Gerenciar Continentes</h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>

        <!-- Link simples para adicionar continente -->
        <a href="cadastro.php">Cadastrar Novo Continente</a>

        <br><br>
        
        <!-- Tabela de continentes -->
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Nome do Continente</th>
                <th>Ações</th>
            </tr>

            <?php
            if ($result_continentes->num_rows > 0) {
                while ($row = $result_continentes->fetch_assoc()) {
                    echo "<tr>
                            <td>" . $row["id_continentes"] . "</td>
                            <td>" . $row["nm_continente"] . "</td>
                            <td>
                                <a href='update_continente.php?id=" . $row["id_continentes"] . "'>Editar</a>
                                <a href='delete_continentes.php?id=" . $row["id_continentes"] . "' onclick='return confirm(\"Tem certeza?\")'>Excluir</a>
                                <a href='paises.php?continente_id=" . $row["id_continentes"] . "'>Gerenciar Países</a>
                            </td>
                        </tr>";
                }
            } else {
                echo "<tr><td colspan='3'>Nenhum continente cadastrado</td></tr>";
            }
            ?>
        </table>
    </div>
</body>
</html>