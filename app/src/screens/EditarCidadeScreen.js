// src/screens/EditarCidadeScreen.js
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

export default function EditarCidadeScreen({ route, navigation }) {
  const { cidade, pais, continente } = route.params;
  const [nomeCidade, setNomeCidade] = useState(cidade.nm_cidades);
  const [loading, setLoading] = useState(false);

  const atualizarCidade = async () => {
    if (!nomeCidade.trim()) {
      Alert.alert("Erro", "Por favor, informe o nome da cidade");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("cidades")
        .update({ 
          nm_cidades: nomeCidade.trim()
        })
        .eq("id_cidades", cidade.id_cidades);

      if (error) throw error;

      Alert.alert("Sucesso", "Cidade atualizada com sucesso!", [
        { 
          text: "OK", 
          onPress: () => navigation.navigate("Cidades", { pais, continente }) 
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar cidade: " + error.message);
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
          <Text style={styles.titulo}>Editar Cidade</Text>
          <Text style={styles.subtitulo}>
            {pais.nm_pais} ({continente.nm_continente})
          </Text>
          <Text style={styles.idText}>ID: #{cidade.id_cidades}</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome da Cidade</Text>
          <TextInput
            style={styles.input}
            value={nomeCidade}
            onChangeText={setNomeCidade}
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={atualizarCidade}
            disabled={loading}
          >
            {loading ? (
              <Ionicons name="hourglass" size={20} color="#fff" />
            ) : (
              <Ionicons name="save" size={20} color="#fff" />
            )}
            <Text style={styles.submitButtonText}>
              {loading ? "Atualizando..." : "Atualizar Cidade"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Links de navegação */}
        <View style={styles.navigationLinks}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Cidades", { pais, continente })}
          >
            <Ionicons name="arrow-back" size={20} color="#286840" />
            <Text style={styles.navButtonText}>Voltar para Cidades</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("CadastroCidade", { pais, continente })}
          >
            <Ionicons name="add-circle" size={20} color="#286840" />
            <Text style={styles.navButtonText}>Cadastrar Nova Cidade</Text>
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
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  idText: {
    color: "#888",
    fontSize: 14,
    marginTop: 2,
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