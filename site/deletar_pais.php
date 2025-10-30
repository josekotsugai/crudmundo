<?php
include 'conexão.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    // Primeiro busque o id_continente para redirecionar depois
    $sql_select = "SELECT id_continente FROM paises WHERE id_paises = $id";
    $result_select = $conex->query($sql_select);
    
    if ($result_select->num_rows > 0) {
        $row = $result_select->fetch_assoc();
        $id_continente = $row['id_continente'];
        
        // Verificar se existem cidades associadas a este país
        $sql_check_cidades = "SELECT COUNT(*) as total FROM cidades WHERE id_pais = $id";
        $result_check = $conex->query($sql_check_cidades);
        $row_check = $result_check->fetch_assoc();
        
        if ($row_check['total'] > 0) {
            echo "<script>
                    alert('Não é possível excluir este país pois existem cidades associadas a ele. Exclua as cidades primeiro.');
                    window.location.href = 'paises.php?continente_id=' + $id_continente;
                  </script>";
            exit();
        }
        
        $sql = "DELETE FROM paises WHERE id_paises = $id";

        if ($conex->query($sql) === TRUE) {
            header("Location: paises.php?continente_id=" . $id_continente);
            exit();
        } else {
            echo "Erro ao excluir país: " . $conex->error;
        }
    } else {
        echo "País não encontrado!";
    }

    $conex->close();
}
?>