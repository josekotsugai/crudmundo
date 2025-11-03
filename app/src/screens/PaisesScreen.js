// src/screens/PaisesScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../supabaseClient";
import { Ionicons } from "@expo/vector-icons";

export default function PaisesScreen({ route, navigation }) {
  const { continente } = route.params;
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPaises();
  }, [continente]);

  const carregarPaises = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("paises")
        .select("*")
        .eq("id_continente", continente.id_continentes)
        .order("nm_pais");

      if (error) throw error;

      setPaises(data || []);
    } catch (error) {
      Alert.alert("Erro", "Erro ao carregar países: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const excluirPais = async (id, nome) => {
    // Verificar se existem cidades associadas
    const { data: cidades, error } = await supabase
      .from("cidades")
      .select("id_cidades")
      .eq("id_pais", id);

    if (error) {
      Alert.alert("Erro", "Erro ao verificar cidades: " + error.message);
      return;
    }

    if (cidades && cidades.length > 0) {
      Alert.alert(
        "Não é possível excluir",
        `Não é possível excluir o país "${nome}" pois existem cidades associadas a ele. Exclua as cidades primeiro.`
      );
      return;
    }

    // Confirmar exclusão
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o país "${nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("paises")
              .delete()
              .eq("id_paises", id);

            if (error) {
              Alert.alert("Erro", "Erro ao excluir país: " + error.message);
            } else {
              carregarPaises();
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemId}>#{item.id_paises}</Text>
        <Text style={styles.itemNome}>{item.nm_pais}</Text>
        <Text style={styles.itemLingua}>Língua: {item.lingua_falada}</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate("EditarPais", { pais: item, continente })}
        >
          <Ionicons name="pencil" size={14} color="#fff" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => excluirPais(item.id_paises, item.nm_pais)}
        >
          <Ionicons name="trash" size={14} color="#fff" />
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.manageButton]}
          onPress={() => navigation.navigate("Cidades", { pais: item, continente })}
        >
          <Ionicons name="business" size={14} color="#fff" />
          <Text style={styles.actionText}>Cidades</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#286840" />
        <Text style={styles.loadingText}>Carregando países...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="earth" size={40} color="#286840" />
        </View>
        <Text style={styles.titulo}>Gerenciar Países</Text>
        <Text style={styles.subtitulo}>{continente.nm_continente}</Text>
      </View>

      {/* Botão de adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CadastroPais", { continente })}
      >
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Cadastrar Novo País</Text>
      </TouchableOpacity>

      {/* Lista de países */}
      {paises.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="flag-outline" size={50} color="#666" />
          <Text style={styles.emptyText}>Nenhum país cadastrado para este continente</Text>
        </View>
      ) : (
        <FlatList
          data={paises}
          keyExtractor={(item) => item.id_paises.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Botão Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="#286840" />
        <Text style={styles.backButtonText}>Voltar para Continentes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
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
    marginBottom: 5,
  },
  subtitulo: {
    color: "#b6b6b6",
    fontSize: 16,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#286840",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#1e1c2e",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  itemInfo: {
    marginBottom: 12,
  },
  itemId: {
    color: "#888",
    fontSize: 12,
    marginBottom: 4,
  },
  itemNome: {
    color: "#FAFAFA",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemLingua: {
    color: "#b6b6b6",
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  manageButton: {
    backgroundColor: "#34C759",
  },
  actionText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  loadingText: {
    color: "#b6b6b6",
    textAlign: "center",
    marginTop: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#286840",
    marginTop: 10,
  },
  backButtonText: {
    color: "#286840",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});