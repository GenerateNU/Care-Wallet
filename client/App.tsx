import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from './navigation/Router';
import { CareWalletProvider } from './contexts/CareWalletContext';

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
