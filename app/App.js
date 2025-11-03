// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContinentesScreen from "./src/screens/ContinentesScreen";
import CadastroContinenteScreen from "./src/screens/CadastroContinenteScreen";
import EditarContinenteScreen from "./src/screens/EditarContinenteScreen";
import PaisesScreen from "./src/screens/PaisesScreen";
import CadastroPaisScreen from "./src/screens/CadastroPaisScreen";
import EditarPaisScreen from "./src/screens/EditarPaisScreen";
import CidadesScreen from "./src/screens/CidadesScreen";
import CadastroCidadeScreen from "./src/screens/CadastroCidadeScreen";
import EditarCidadeScreen from "./src/screens/EditarCidadeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Continentes"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#286840',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Continentes" 
          component={ContinentesScreen}
          options={{ title: 'CRUD Mundo - Continentes' }}
        />
        <Stack.Screen 
          name="CadastroContinente" 
          component={CadastroContinenteScreen}
          options={{ title: 'Cadastrar Continente' }}
        />
        <Stack.Screen 
          name="EditarContinente" 
          component={EditarContinenteScreen}
          options={{ title: 'Editar Continente' }}
        />
        <Stack.Screen 
          name="Paises" 
          component={PaisesScreen}
          options={{ title: 'Gerenciar Países' }}
        />
        <Stack.Screen 
          name="CadastroPais" 
          component={CadastroPaisScreen}
          options={{ title: 'Cadastrar País' }}
        />
        <Stack.Screen 
          name="EditarPais" 
          component={EditarPaisScreen}
          options={{ title: 'Editar País' }}
        />
        <Stack.Screen 
          name="Cidades" 
          component={CidadesScreen}
          options={{ title: 'Gerenciar Cidades' }}
        />
        <Stack.Screen 
          name="CadastroCidade" 
          component={CadastroCidadeScreen}
          options={{ title: 'Cadastrar Cidade' }}
        />
        <Stack.Screen 
          name="EditarCidade" 
          component={EditarCidadeScreen}
          options={{ title: 'Editar Cidade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}