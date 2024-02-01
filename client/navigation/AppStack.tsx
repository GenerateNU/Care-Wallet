import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/Login';
import BottomTabNavigator from './BottomTabNavigator';
import { RootStackParamList } from './Router';

export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ headerShown: true }}
        component={LoginPage}
      />
      <Stack.Screen
        name="BottomNav"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
}
