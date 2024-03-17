import React from 'react';

import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../screens/LoginPage';
import { TaskCreation } from '../screens/TaskCreation';
import { TaskType } from '../screens/TaskType';
import { AppStackBottomTabNavigator } from './AppStackBottomTabNavigator';

export type AppStackParamList = {
  TaskType: undefined;
  Main: undefined;
  Home: undefined;
  Login: undefined;
  Profile: undefined;
  TaskCreation: { type: string };
};

export type AppStackNavigation = NavigationProp<AppStackParamList>;

const AppStack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigation() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="TaskType"
        options={{ headerShown: false }}
        component={TaskType}
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

      <AppStack.Screen
        name="TaskCreation"
        options={{ headerShown: false }}
        component={TaskCreation}
      />
    </AppStack.Navigator>
  );
}
