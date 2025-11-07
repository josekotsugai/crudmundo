// src/screens/CadastroCidadeScreen.js
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
import { supabase } from "../../supabaseClient"; // Conexão com o banco
import { Ionicons } from "@expo/vector-icons"; // Ícones da interface

export default function CadastroCidadeScreen({ route, navigation }) {
  const { pais, continente } = route.params; // Dados recebidos da tela anterior
  const [nomeCidade, setNomeCidade] = useState(""); // Estado do nome da cidade
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Função para cadastrar nova cidade no banco
  const cadastrarCidade = async () => {
    if (!nomeCidade.trim()) {
      Alert.alert("Erro", "Por favor, informe o nome da cidade");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("cidades")
        .insert([
          { 
            nm_cidades: nomeCidade.trim(), 
            id_pais: pais.id_paises // Associa cidade ao país
          }
        ]);

      if (error) throw error;

      Alert.alert("Sucesso", "Cidade cadastrada com sucesso!", [
        { 
          text: "OK", 
          onPress: () => navigation.navigate("Cidades", { pais, continente }) 
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar cidade: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho com informações do país e continente */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="business" size={40} color="#286840" />
          </View>
          <Text style={styles.titulo}>Cadastrar Cidade</Text>
          <Text style={styles.subtitulo}>
            {pais.nm_pais} ({continente.nm_continente})
          </Text>
        </View>

        {/* Formulário de cadastro */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome da Cidade</Text>
          <TextInput
            style={styles.input}
            value={nomeCidade}
            onChangeText={setNomeCidade}
            placeholder="Ex: São Paulo, Rio de Janeiro, Paris..."
            placeholderTextColor="#666"
          />

          {/* Botão de submit com estados de loading */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={cadastrarCidade}
            disabled={loading}
          >
            {loading ? (
              <Ionicons name="hourglass" size={20} color="#fff" />
            ) : (
              <Ionicons name="save" size={20} color="#fff" />
            )}
            <Text style={styles.submitButtonText}>
              {loading ? "Cadastrando..." : "Cadastrar Cidade"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão para voltar à lista de cidades */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Cidades", { pais, continente })}
        >
          <Ionicons name="arrow-back" size={20} color="#286840" />
          <Text style={styles.backButtonText}>← Voltar para Cidades</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Estilos com tema escuro e cores personalizadas
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020", // Cor de fundo principal
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  logoContainer: {
    backgroundColor: "#1e1c2e", // Container do ícone
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
  },
  titulo: {
    color: "#FAFAFA",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    color: "#b6b6b6",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#1e1c2e", // Container do formulário
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
    backgroundColor: "#2e2e3e", // Campo de entrada
    color: "#b6b6b6",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#444",
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: "#286840", // Verde principal
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#666", // Cinza quando desabilitado
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#286840", // Borda verde
  },
  backButtonText: {
    color: "#286840",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});