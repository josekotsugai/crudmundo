<?php
include 'conexão.php';

$pais_id = $_GET['pais_id'];

// Buscar dados do país
$sql_pais = "SELECT p.*, c.nm_continente 
             FROM paises p 
             INNER JOIN continentes c ON p.id_continente = c.id_continentes 
             WHERE p.id_paises = $pais_id";
$result_pais = $conex->query($sql_pais);
$pais = $result_pais->fetch_assoc();

// Buscar cidades do país
$sql_cidades = "SELECT * FROM cidades WHERE id_pais = $pais_id ORDER BY nm_cidades";
$result_cidades = $conex->query($sql_cidades);
?>

<!DOCTYPE html>
<html>
<head>
    <title>CRUD Mundo - Cidades</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="shortcut icon" href="logo.ico" type="image/x-icon">
</head>
<body>
    <div class="caixa">
        <hr>
        <h2>Gerenciar Cidades - <?php echo $pais['nm_pais']; ?> (<?php echo $pais['nm_continente']; ?>)</h2>
        <hr>
        <div class="logo-container">
            <img src="img/logo.png" alt="Logo" class="center-image">
        </div>

        <!-- Link para adicionar cidade -->
        <a href="cadastro_cidade.php?pais_id=<?php echo $pais_id; ?>">Cadastrar Nova Cidade</a>

        <br><br>
        
        <!-- Tabela de cidades -->
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Nome da Cidade</th>
                <th>Ações</th>
            </tr>

            <?php
            if ($result_cidades->num_rows > 0) {
                while ($row = $result_cidades->fetch_assoc()) {
                    echo "<tr>
                            <td>" . $row["id_cidades"] . "</td>
                            <td>" . $row["nm_cidades"] . "</td>
                            <td>
                                <a href='editar_cidade.php?id=" . $row["id_cidades"] . "'>Editar</a>
                                <a href='deletar_cidade.php?id=" . $row["id_cidades"] . "' onclick='return confirm(\"Tem certeza?\")'>Excluir</a>
                            </td>
                        </tr>";
                }
            } else {
                echo "<tr><td colspan='3'>Nenhuma cidade cadastrada para este país</td></tr>";
            }
            ?>
        </table>
        
        <br>
        <a href="paises.php?continente_id=<?php echo $pais['id_continente']; ?>">Voltar para Países</a>
        <br>
        <a href="index.php">Voltar para Continentes</a>
    </div>
</body>
</html>