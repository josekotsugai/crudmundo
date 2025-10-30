<?php
include 'conexão.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    // Primeiro verifique se existem países associados a este continente
    $check_sql = "SELECT COUNT(*) as total FROM paises WHERE id_continente = $id";
    $check_result = $conex->query($check_sql);
    $row = $check_result->fetch_assoc();
    
    //verifica se o continente tem paises
    if ($row['total'] > 0) {
        echo 
    "<script>
        alert('Não é possível excluir este continente pois existem países associadas a ele. Exclua os países e se tiver cidades também.');
        window.location.href = 'index.php';
    </script>";
        exit();
    }
    
    $sql = "DELETE FROM continentes WHERE id_continentes = $id";

    if ($conex->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "Erro ao excluir continente: " . $conex->error;
    }

    $conex->close();
}



?>