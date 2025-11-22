// src/screens/CadastroContinenteScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { supabase } from "../../supabaseClient"; // Cliente do Supabase para operações de banco de dados
import { Ionicons } from "@expo/vector-icons"; // Biblioteca de ícones

// Tela de cadastro de continentes
export default function CadastroContinenteScreen({ navigation }) {
  // Estado para armazenar o nome do continente sendo cadastrado
  const [nomeContinente, setNomeContinente] = useState("");
  // Estado para controlar o carregamento durante o cadastro
  const [loading, setLoading] = useState(false);

  // Função assíncrona para cadastrar um novo continente no banco de dados
  const cadastrarContinente = async () => {
    // Validação: verifica se o nome do continente não está vazio
    if (!nomeContinente.trim()) {
      Alert.alert("Erro", "Por favor, informe o nome do continente");
      return;
    }

    try {
      setLoading(true); // Inicia o estado de carregamento
      
      // Insere o novo continente na tabela 'continentes' do Supabase
      const { error } = await supabase
        .from("continentes")
        .insert([{ nm_continente: nomeContinente.trim() }]);

      // Se houver erro na inserção, lança uma exceção
      if (error) throw error;

      // Alerta de sucesso com callback para voltar à tela anterior
      Alert.alert("Sucesso", "Continente cadastrado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      // Tratamento de erro com mensagem detalhada
      Alert.alert("Erro", "Erro ao cadastrar continente: " + error.message);
    } finally {
      // Finaliza o estado de carregamento independente do resultado
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ScrollView para garantir que o conteúdo seja rolável em telas menores */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho da tela com ícone e título */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="add-circle" size={40} color="#286840" />
          </View>
          <Text style={styles.titulo}>Cadastrar Continente</Text>
        </View>

        {/* Container do formulário de cadastro */}
        <View style={styles.formContainer}>
          {/* Label do campo de entrada */}
          <Text style={styles.label}>Nome do Continente</Text>
          {/* Campo de texto para inserir o nome do continente */}
          <TextInput
            style={styles.input}
            value={nomeContinente}
            onChangeText={setNomeContinente} // Atualiza o estado com o texto digitado
            placeholder="Ex: América do Sul, Europa, Ásia..."
            placeholderTextColor="#666"
          />

          {/* Botão de submit para cadastrar o continente */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={cadastrarContinente}
            disabled={loading} // Desabilita o botão durante o carregamento
          >
            {/* Ícone condicional: mostra ícone de loading ou de salvar */}
            {loading ? (
              <Ionicons name="hourglass" size={20} color="#fff" />
            ) : (
              <Ionicons name="save" size={20} color="#fff" />
            )}
            {/* Texto condicional do botão */}
            <Text style={styles.submitButtonText}>
              {loading ? "Cadastrando..." : "Cadastrar Continente"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão para voltar à tela anterior */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#286840" />
          <Text style={styles.backButtonText}>Voltar para Continentes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Folha de estilos para a tela de cadastro de continentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020", // Cor de fundo escura para tema escuro
  },
  scrollContainer: {
    flexGrow: 1, // Permite que o conteúdo cresça para preencher o espaço
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  logoContainer: {
    backgroundColor: "#1e1c2e", // Cor de fundo do container do ícone
    padding: 15,
    borderRadius: 50, // Bordas arredondadas para criar um círculo
    marginBottom: 10,
  },
  titulo: {
    color: "#FAFAFA", // Cor do texto em branco para contraste
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#1e1c2e", // Cor de fundo do formulário
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    color: "#FAFAFA",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#2e2e3e", // Cor de fundo do input
    color: "#b6b6b6", // Cor do texto do input
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#444", // Borda sutil para o input
  },
  submitButton: {
    flexDirection: "row", // Organiza ícone e texto em linha
    backgroundColor: "#286840", // Cor verde para o botão principal
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#666", // Cor cinza quando desabilitado
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8, // Espaçamento entre ícone e texto
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#286840", // Borda verde para o botão secundário
  },
  backButtonText: {
    color: "#286840", // Texto verde para combinar com a borda
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});