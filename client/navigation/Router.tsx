import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';

export type ScreenNames = ['BottomNav', 'Landing', 'Login'];
export type RootStackParamList = Record<ScreenNames[number], any>;

export default function Router() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
