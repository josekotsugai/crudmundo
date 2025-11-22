// src/providers/SafeAreaProvider.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Componente provedor que encapsula a aplicação com SafeAreaProvider
 * Garante que o conteúdo seja renderizado de forma segura em dispositivos
 * com notches, barras de status ou outras áreas não seguras
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.children - Componentes filhos a serem envolvidos pelo provider
 * @returns {JSX.Element} Componente SafeAreaProvider com os children
 */
export default function AppSafeAreaProvider({ children }) {
  return (
    // Provider do react-native-safe-area-context que gerencia as áreas seguras
    <SafeAreaProvider>
      {children}
    </SafeAreaProvider>
  );
}