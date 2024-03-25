import React from 'react';
import { SafeAreaView } from 'react-native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';

import { CareWalletProvider } from './contexts/CareWalletContext';
import { Router } from './navigation/Router';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CareWalletProvider>
        <SafeAreaView style={{ flex: 1 }} className="bg-carewallet-white">
          <PaperProvider>
            <Router />
          </PaperProvider>
        </SafeAreaView>
      </CareWalletProvider>
    </QueryClientProvider>
  );
}
