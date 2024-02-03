import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Router from './navigation/Router';
import CareWalletProvider from './contexts/CareWalletContext';

export default function App() {
  return (
    <CareWalletProvider>
      <SafeAreaView className="flex-1">
        <Router />
      </SafeAreaView>
    </CareWalletProvider>
  );
}
