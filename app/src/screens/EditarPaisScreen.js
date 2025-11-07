// src/screens/EditarPaisScreen.js
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
import { supabase } from "../../supabaseClient";
import { Ionicons } from "@expo/vector-icons";

export default function EditarPaisScreen({ route, navigation }) {
  const { pais, continente } = route.params;
  const [nomePais, setNomePais] = useState(pais.nm_pais);
  const [linguaFalada, setLinguaFalada] = useState(pais.lingua_falada);
  const [loading, setLoading] = useState(false);

  const atualizarPais = async () => {
    if (!nomePais.trim() || !linguaFalada.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("paises")
        .update({ 
          nm_pais: nomePais.trim(), 
          lingua_falada: linguaFalada.trim() 
        })
        .eq("id_paises", pais.id_paises);

      if (error) throw error;

      Alert.alert("Sucesso", "País atualizado com sucesso!", [
        { 
          text: "OK", 
          onPress: () => navigation.navigate("Paises", { continente }) 
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar país: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="flag" size={40} color="#286840" />
          </View>
          <Text style={styles.titulo}>Editar País</Text>
          <Text style={styles.subtitulo}>
            {continente.nm_continente} - ID: #{pais.id_paises}
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome do País</Text>
          <TextInput
            style={styles.input}
            value={nomePais}
            onChangeText={setNomePais}
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Língua Falada</Text>
          <TextInput
            style={styles.input}
            value={linguaFalada}
            onChangeText={setLinguaFalada}
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={atualizarPais}
            disabled={loading}
          >
            {loading ? (
              <Ionicons name="hourglass" size={20} color="#fff" />
            ) : (
              <Ionicons name="save" size={20} color="#fff" />
            )}
            <Text style={styles.submitButtonText}>
              {loading ? "Atualizando..." : "Atualizar País"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Links de navegação */}
        <View style={styles.navigationLinks}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Paises", { continente })}
          >
            <Ionicons name="arrow-back" size={20} color="#286840" />
            <Text style={styles.navButtonText}>Voltar para Países</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("CadastroPais", { continente })}
          >
            <Ionicons name="add-circle" size={20} color="#286840" />
            <Text style={styles.navButtonText}>Cadastrar Novo País</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Cidades", { pais, continente })}
          >
            <Ionicons name="business" size={20} color="#286840" />
            <Text style={styles.navButtonText}>Gerenciar Cidades deste País</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 14,
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
  navigationLinks: {
    gap: 10,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#286840",
  },
  navButtonText: {
    color: "#286840",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
    textAlign: "center",
  },
});
