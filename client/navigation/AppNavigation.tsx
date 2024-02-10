import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../screens/Login';
import { AppStackBottomTabNavigator } from './AppStackBottomTabNavigator';

export type AppScreenNames = ['MainNavScreens', 'Landing', 'Login', 'Calendar'];
export type AppStackNavigation = NavigationProp<AppStackParamList>;
type AppStackParamList = Record<AppScreenNames[number], any>;

const AppStack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigation() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Login"
        options={{ headerShown: true }}
        component={LoginPage}
      />
      <AppStack.Screen
        name="MainNavScreens"
        options={{ headerShown: false }}
        component={AppStackBottomTabNavigator}
      />
    </AppStack.Navigator>
  );
}
