// src/screens/CadastroPaisScreen.js
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

export default function CadastroPaisScreen({ route, navigation }) {
  const { continente } = route.params;
  const [nomePais, setNomePais] = useState("");
  const [linguaFalada, setLinguaFalada] = useState("");
  const [loading, setLoading] = useState(false);

  const cadastrarPais = async () => {
    if (!nomePais.trim() || !linguaFalada.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("paises")
        .insert([
          { 
            nm_pais: nomePais.trim(), 
            lingua_falada: linguaFalada.trim(), 
            id_continente: continente.id_continentes 
          }
        ]);

      if (error) throw error;

      Alert.alert("Sucesso", "País cadastrado com sucesso!", [
        { 
          text: "OK", 
          onPress: () => navigation.navigate("Paises", { continente }) 
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar país: " + error.message);
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
            <Ionicons name="flag" size={40} color="#286840" />
          </View>
          <Text style={styles.titulo}>Cadastrar País</Text>
          <Text style={styles.subtitulo}>{continente.nm_continente}</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome do País</Text>
          <TextInput
            style={styles.input}
            value={nomePais}
            onChangeText={setNomePais}
            placeholder="Ex: Brasil, Argentina, França..."
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Língua Falada</Text>
          <TextInput
            style={styles.input}
            value={linguaFalada}
            onChangeText={setLinguaFalada}
            placeholder="Ex: Português, Espanhol, Francês..."
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={cadastrarPais}
            disabled={loading}
          >
            {loading ? (
              <Ionicons name="hourglass" size={20} color="#fff" />
            ) : (
              <Ionicons name="save" size={20} color="#fff" />
            )}
            <Text style={styles.submitButtonText}>
              {loading ? "Cadastrando..." : "Cadastrar País"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Paises", { continente })}
        >
          <Ionicons name="arrow-back" size={20} color="#286840" />
          <Text style={styles.backButtonText}>← Voltar para Países</Text>
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