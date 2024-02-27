import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CareWalletProvider } from './contexts/CareWalletContext';
import { Router } from './navigation/Router';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CareWalletProvider>
        <SafeAreaView className="flex-1">
          <PaperProvider>
            <Router />
          </PaperProvider>
        </SafeAreaView>
      </CareWalletProvider>
    </QueryClientProvider>
  );
}
