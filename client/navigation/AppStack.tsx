import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/Login';
import AppStackBottomTabNavigator from './BottomTabNavigator';

export type AppScreenNames = ['BottomNavScreens', 'Landing', 'Login'];
type AppStackParamList = Record<AppScreenNames[number], any>;
export type StackNavigation = NavigationProp<AppStackParamList>;
const AppStack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigation() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Login"
        options={{ headerShown: true }}
        component={LoginPage}
      />
      <AppStack.Screen
        name="BottomNavScreens"
        options={{ headerShown: false }}
        component={AppStackBottomTabNavigator}
      />
    </AppStack.Navigator>
  );
}
