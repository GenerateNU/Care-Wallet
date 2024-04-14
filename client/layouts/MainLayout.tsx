import React from 'react';
import { SafeAreaView } from 'react-native';

import { Background } from '../components/Background';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView>
      <Background />
      {children}
    </SafeAreaView>
  );
}
