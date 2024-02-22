import React from 'react';

import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import App from '../App';
import LoginPage from '../screens/LoginPage';
import TaskListScreen from '../screens/TaskList';
import { AppStackBottomTabNavigator } from './AppStackBottomTabNavigator';

export type AppStackParamList = {
  Main: undefined;
  Home: undefined;
  Login: undefined;
};

export type AppStackNavigation = NavigationProp<AppStackParamList>;

const AppStack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigation() {
  return (
    <AppStack.Navigator>
      {/* Placeholder to test task screen */}
      <AppStack.Screen
        name="Home"
        options={{ headerShown: true }}
        component={TaskListScreen}
      />
      <AppStack.Screen
        name="Login"
        options={{ headerShown: true }}
        component={LoginPage}
      />
      <AppStack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={AppStackBottomTabNavigator}
      />
    </AppStack.Navigator>
  );
}
