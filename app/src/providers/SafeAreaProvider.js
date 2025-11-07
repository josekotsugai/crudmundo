// src/providers/SafeAreaProvider.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AppSafeAreaProvider({ children }) {
  return (
    <SafeAreaProvider>
      {children}
    </SafeAreaProvider>
  );
}