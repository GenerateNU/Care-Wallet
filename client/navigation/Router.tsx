import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';

export default function Router() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
