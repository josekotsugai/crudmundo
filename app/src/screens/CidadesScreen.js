// src/screens/CidadesScreen.js
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

export default function CidadesScreen({ route, navigation }) {
  const { pais, continente } = route.params;
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCidades();
  }, [pais]);

  const carregarCidades = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("cidades")
        .select("*")
        .eq("id_pais", pais.id_paises)
        .order("nm_cidades");

      if (error) throw error;

      setCidades(data || []);
    } catch (error) {
      Alert.alert("Erro", "Erro ao carregar cidades: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const excluirCidade = async (id, nome) => {
    // Confirmar exclusão
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir a cidade "${nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("cidades")
              .delete()
              .eq("id_cidades", id);

            if (error) {
              Alert.alert("Erro", "Erro ao excluir cidade: " + error.message);
            } else {
              carregarCidades();
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemId}>#{item.id_cidades}</Text>
        <Text style={styles.itemNome}>{item.nm_cidades}</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate("EditarCidade", { cidade: item, pais, continente })}
        >
          <Ionicons name="pencil" size={14} color="#fff" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => excluirCidade(item.id_cidades, item.nm_cidades)}
        >
          <Ionicons name="trash" size={14} color="#fff" />
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#286840" />
        <Text style={styles.loadingText}>Carregando cidades...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="business" size={40} color="#286840" />
        </View>
        <Text style={styles.titulo}>Gerenciar Cidades</Text>
        <Text style={styles.subtitulo}>
          {pais.nm_pais} ({continente.nm_continente})
        </Text>
      </View>

      {/* Botão de adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CadastroCidade", { pais, continente })}
      >
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Cadastrar Nova Cidade</Text>
      </TouchableOpacity>

      {/* Lista de cidades */}
      {cidades.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="business-outline" size={50} color="#666" />
          <Text style={styles.emptyText}>Nenhuma cidade cadastrada para este país</Text>
        </View>
      ) : (
        <FlatList
          data={cidades}
          keyExtractor={(item) => item.id_cidades.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Botões de navegação */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Paises", { continente })}
        >
          <Ionicons name="arrow-back" size={20} color="#286840" />
          <Text style={styles.backButtonText}>Voltar para Países</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Continentes")}
        >
          <Ionicons name="globe" size={20} color="#286840" />
          <Text style={styles.backButtonText}>Voltar para Continentes</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: "center",
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
    borderLeftColor: "#FF9500",
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
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: "center",
    minWidth: 80,
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
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
  navigationButtons: {
    gap: 10,
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
  },
  backButtonText: {
    color: "#286840",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});