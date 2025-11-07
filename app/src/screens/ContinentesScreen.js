// src/screens/ContinentesScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../supabaseClient";
import { Ionicons } from "@expo/vector-icons";

export default function ContinentesScreen({ navigation }) {
  const [continentes, setContinentes] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarContinentes = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("continentes")
        .select("*")
        .order("nm_continente");

      if (error) {
        throw error;
      }

      setContinentes(data || []);
    } catch (error) {
      Alert.alert("Erro", "Erro ao carregar continentes: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarContinentes();
  }, [carregarContinentes]);

  const excluirContinente = async (id, nome) => {
    // Verificar se existem países associados
    const { data: paises, error } = await supabase
      .from("paises")
      .select("id_paises")
      .eq("id_continente", id);

    if (error) {
      Alert.alert("Erro", "Erro ao verificar países: " + error.message);
      return;
    }

    if (paises && paises.length > 0) {
      Alert.alert(
        "Não é possível excluir",
        `Não é possível excluir o continente "${nome}" pois existem países associados a ele. Exclua os países primeiro.`
      );
      return;
    }

    // Confirmar exclusão
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o continente "${nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("continentes")
              .delete()
              .eq("id_continentes", id);

            if (error) {
              Alert.alert("Erro", "Erro ao excluir continente: " + error.message);
            } else {
              carregarContinentes();
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemId}>#{item.id_continentes}</Text>
        <Text style={styles.itemNome}>{item.nm_continente}</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate("EditarContinente", { continente: item })}
        >
          <Ionicons name="pencil" size={16} color="#fff" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => excluirContinente(item.id_continentes, item.nm_continente)}
        >
          <Ionicons name="trash" size={16} color="#fff" />
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.manageButton]}
          onPress={() => navigation.navigate("Paises", { continente: item })}
        >
          <Ionicons name="earth" size={16} color="#fff" />
          <Text style={styles.actionText}>Países</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#286840" />
        <Text style={styles.loadingText}>Carregando continentes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header com logo e título */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="globe" size={40} color="#286840" />
        </View>
        <Text style={styles.titulo}>CRUD Mundo</Text>
        <Text style={styles.subtitulo}>Gerenciar Continentes</Text>
      </View>

      {/* Botão de adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CadastroContinente")}
      >
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Cadastrar Novo Continente</Text>
      </TouchableOpacity>

      {/* Lista de continentes */}
      {continentes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={50} color="#666" />
          <Text style={styles.emptyText}>Nenhum continente cadastrado</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate("CadastroContinente")}
          >
            <Text style={styles.emptyButtonText}>Cadastrar Primeiro Continente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={continentes}
          keyExtractor={(item) => item.id_continentes.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
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
    fontSize: 24,
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
    borderLeftColor: "#286840",
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
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
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
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: "#286840",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    color: "#b6b6b6",
    textAlign: "center",
    marginTop: 10,
  },
});
