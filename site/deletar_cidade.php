<?php
include 'conexão.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    // Primeiro busque o id_pais para redirecionar depois
    $sql_select = "SELECT id_pais FROM cidades WHERE id_cidades = $id";
    $result_select = $conex->query($sql_select);
    
    if ($result_select->num_rows > 0) {
        $row = $result_select->fetch_assoc();
        $id_pais = $row['id_pais'];
        
        $sql = "DELETE FROM cidades WHERE id_cidades = $id";

        if ($conex->query($sql) === TRUE) {
            header("Location: cidades.php?pais_id=" . $id_pais);
            exit();
        } else {
            echo "Erro ao excluir cidade: " . $conex->error;
        }
    } else {
        echo "Cidade não encontrada!";
    }

    $conex->close();
}
?>