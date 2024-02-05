import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Router from './navigation/Router';
import CareWalletProvider from './contexts/CareWalletContext';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <CareWalletProvider>
      <SafeAreaView className="flex-1">
        <PaperProvider>
          <Router />
        </PaperProvider>
      </SafeAreaView>
    </CareWalletProvider>
  );
}
