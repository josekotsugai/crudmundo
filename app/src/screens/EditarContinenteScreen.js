// src/screens/EditarContinenteScreen.js
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

export default function EditarContinenteScreen({ route, navigation }) {
  const { continente } = route.params;
  const [nomeContinente, setNomeContinente] = useState(continente.nm_continente);
  const [loading, setLoading] = useState(false);

  const atualizarContinente = async () => {
    if (!nomeContinente.trim()) {
      Alert.alert("Erro", "Por favor, informe o nome do continente");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("continentes")
        .update({ nm_continente: nomeContinente.trim() })
        .eq("id_continentes", continente.id_continentes);

      if (error) throw error;

      Alert.alert("Sucesso", "Continente atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar continente: " + error.message);
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
            <Ionicons name="pencil" size={40} color="#286840" />
          </View>
          <Text style={styles.titulo}>Editar Continente</Text>
          <Text style={styles.subtitulo}>ID: #{continente.id_continentes}</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome do Continente</Text>
          <TextInput
            style={styles.input}
            value={nomeContinente}
            onChangeText={setNomeContinente}
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={atualizarContinente}
            disabled={loading}
          >
            {loading ? (
              <Ionicons name="hourglass" size={20} color="#fff" />
            ) : (
              <Ionicons name="save" size={20} color="#fff" />
            )}
            <Text style={styles.submitButtonText}>
              {loading ? "Atualizando..." : "Atualizar Continente"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Links de navegação */}
        <View style={styles.navigationLinks}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#286840" />
            <Text style={styles.navButtonText}>Voltar para Continentes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("CadastroContinente")}
          >
            <Ionicons name="add-circle" size={20} color="#286840" />
            <Text style={styles.navButtonText}>Cadastrar Novo Continente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Paises", { continente })}
          >
            <Ionicons name="earth" size={20} color="#286840" />
            <Text style={styles.navButtonText}>Gerenciar Países deste Continente</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 14,
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