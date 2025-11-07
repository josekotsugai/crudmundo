// App.js
/**
 * CRUD MUNDO - Aplicativo de Gerenciamento Geográfico
 * 
 * Este é o componente principal do aplicativo que configura toda a navegação
 * entre as diferentes telas do sistema de CRUD para continentes, países e cidades.
 * 
 * Funcionalidades:
 * - Navegação em stack entre todas as telas
 * - Configuração visual consistente do header
 * - Integração com Supabase para operações CRUD
 */

import React from "react";
// Import do sistema de navegação
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import de todas as telas do aplicativo
import ContinentesScreen from "./src/screens/ContinentesScreen";          // Tela principal - Lista de continentes
import CadastroContinenteScreen from "./src/screens/CadastroContinenteScreen"; // Tela de cadastro de continentes
import EditarContinenteScreen from "./src/screens/EditarContinenteScreen";     // Tela de edição de continentes
import PaisesScreen from "./src/screens/PaisesScreen";                    // Tela de lista de países por continente
import CadastroPaisScreen from "./src/screens/CadastroPaisScreen";        // Tela de cadastro de países
import EditarPaisScreen from "./src/screens/EditarPaisScreen";            // Tela de edição de países
import CidadesScreen from "./src/screens/CidadesScreen";                  // Tela de lista de cidades por país
import CadastroCidadeScreen from "./src/screens/CadastroCidadeScreen";    // Tela de cadastro de cidades
import EditarCidadeScreen from "./src/screens/EditarCidadeScreen";        // Tela de edição de cidades

// Cria o navigator em stack para gerenciar a navegação entre telas
const Stack = createNativeStackNavigator();

/**
 * Componente principal do aplicativo
 * 
 * Estrutura de navegação:
 * - Continentes (Tela inicial) → Países → Cidades
 * - Cada entidade tem telas de Cadastro e Edição
 * - Navegação hierárquica: Continente → País → Cidade
 */
export default function App() {
  return (
    /**
     * NavigationContainer: Componente raiz que envolve toda a navegação
     * Fornece o contexto de navegação para todos os componentes filhos
     */
    <NavigationContainer>
      {/**
       * Stack.Navigator: Configura a navegação em pilha
       * - initialRouteName: Define qual tela carrega primeiro
       * - screenOptions: Configurações visuais aplicadas a todas as telas
       */}
      <Stack.Navigator 
        initialRouteName="Continentes"  // Tela inicial do app
        screenOptions={{
          // Configuração visual do header (cabeçalho)
          headerStyle: {
            backgroundColor: '#286840',  // Cor verde escuro do tema
          },
          headerTintColor: '#fff',       // Cor do texto e ícones no header
          headerTitleStyle: {
            fontWeight: 'bold',          // Fonte em negrito para o título
          },
        }}
      >
        {/**
         * TELA: ContinentesScreen
         * Propósito: Tela principal que lista todos os continentes
         * Funcionalidades: Listar, navegar para países, editar, excluir
         */}
        <Stack.Screen 
          name="Continentes" 
          component={ContinentesScreen}
          options={{ title: 'CRUD Mundo - Continentes' }}
        />

        {/**
         * TELA: CadastroContinenteScreen
         * Propósito: Cadastrar novos continentes no sistema
         * Fluxo: Formulário simples com validação
         */}
        <Stack.Screen 
          name="CadastroContinente" 
          component={CadastroContinenteScreen}
          options={{ title: 'Cadastrar Continente' }}
        />

        {/**
         * TELA: EditarContinenteScreen  
         * Propósito: Editar continentes existentes
         * Recebe parâmetros: continente (objeto com dados atuais)
         */}
        <Stack.Screen 
          name="EditarContinente" 
          component={EditarContinenteScreen}
          options={{ title: 'Editar Continente' }}
        />

        {/**
         * TELA: PaisesScreen
         * Propósito: Listar países de um continente específico
         * Recebe parâmetros: continente (para filtro e contexto)
         * Funcionalidades: Listar, cadastrar, editar, excluir países
         */}
        <Stack.Screen 
          name="Paises" 
          component={PaisesScreen}
          options={{ title: 'Gerenciar Países' }}
        />

        {/**
         * TELA: CadastroPaisScreen
         * Propósito: Cadastrar novo país em um continente
         * Recebe parâmetros: continente (para associar o país)
         * Campos: Nome do país, língua falada
         */}
        <Stack.Screen 
          name="CadastroPais" 
          component={CadastroPaisScreen}
          options={{ title: 'Cadastrar País' }}
        />

        {/**
         * TELA: EditarPaisScreen
         * Propósito: Editar país existente
         * Recebe parâmetros: pais (dados atuais), continente (contexto)
         */}
        <Stack.Screen 
          name="EditarPais" 
          component={EditarPaisScreen}
          options={{ title: 'Editar País' }}
        />

        {/**
         * TELA: CidadesScreen
         * Propósito: Listar cidades de um país específico
         * Recebe parâmetros: pais (para filtro), continente (contexto)
         * Funcionalidades: Listar, cadastrar, editar, excluir cidades
         */}
        <Stack.Screen 
          name="Cidades" 
          component={CidadesScreen}
          options={{ title: 'Gerenciar Cidades' }}
        />

        {/**
         * TELA: CadastroCidadeScreen
         * Propósito: Cadastrar nova cidade em um país
         * Recebe parâmetros: pais (para associar), continente (contexto)
         * Campos: Nome da cidade
         */}
        <Stack.Screen 
          name="CadastroCidade" 
          component={CadastroCidadeScreen}
          options={{ title: 'Cadastrar Cidade' }}
        />

        {/**
         * TELA: EditarCidadeScreen
         * Propósito: Editar cidade existente
         * Recebe parâmetros: cidade (dados atuais), pais, continente (contexto)
         */}
        <Stack.Screen 
          name="EditarCidade" 
          component={EditarCidadeScreen}
          options={{ title: 'Editar Cidade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * ESTRUTURA COMPLETA DO APLICATIVO:
 * 
 * Navegação Hierárquica:
 * Continentes → [Países] → [Cidades]
 * 
 * Operações CRUD por Nível:
 * - Continentes: Create, Read, Update, Delete
 * - Países: Create, Read, Update, Delete (com validação de continente)
 * - Cidades: Create, Read, Update, Delete (com validação de país)
 * 
 * Tecnologias Utilizadas:
 * - Frontend: React Native com Expo
 * - Navegação: React Navigation Native Stack
 * - Banco de Dados: Supabase (PostgreSQL)
 * - Ícones: Expo Vector Icons
 * 
 * Fluxo de Dados:
 * 1. App inicia em ContinentesScreen
 * 2. Usuário seleciona continente → navega para Países
 * 3. Usuário seleciona país → navega para Cidades
 * 4. Em cada nível, pode adicionar/editar/excluir itens
 * 
 * Validações de Integridade:
 * - Não permite excluir continente com países
 * - Não permite excluir país com cidades
 * - Mantém consistência referencial
 */