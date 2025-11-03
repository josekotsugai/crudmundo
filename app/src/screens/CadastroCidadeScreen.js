// src/screens/CadastroCidadeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { supabase } from "../../supabaseClient";
import { Ionicons } from "@expo/vector-icons";

export default function CadastroCidadeScreen({ route, navigation }) {
  const { pais, continente } = route.params;
  const [nomeCidade, setNomeCidade] = useState("");
  const [loading, setLoading] = useState(false);

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
            id_pais: pais.id_paises 
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="business" size={40} color="#286840" />
          </View>
          <Text style={styles.titulo}>Cadastrar Cidade</Text>
          <Text style={styles.subtitulo}>
            {pais.nm_pais} ({continente.nm_continente})
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome da Cidade</Text>
          <TextInput
            style={styles.input}
            value={nomeCidade}
            onChangeText={setNomeCidade}
            placeholder="Ex: São Paulo, Rio de Janeiro, Paris..."
            placeholderTextColor="#666"
          />

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

        {/* Botão Voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Cidades", { pais, continente })}
        >
          <Ionicons name="arrow-back" size={20} color="#286840" />
          <Text style={styles.backButtonText}>← Voltar para Cidades</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
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
    backgroundColor: "#1e1c2e",
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
    backgroundColor: "#1e1c2e",
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
    backgroundColor: "#2e2e3e",
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
    backgroundColor: "#286840",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#666",
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
    borderColor: "#286840",
  },
  backButtonText: {
    color: "#286840",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});