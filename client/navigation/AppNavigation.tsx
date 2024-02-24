import React from 'react';

import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddNewTask from '../screens/AddNewTask';
import LoginPage from '../screens/LoginPage';
import { AppStackBottomTabNavigator } from './AppStackBottomTabNavigator';

export type AppStackParamList = {
  Main: undefined;
  Home: undefined;
  Login: undefined;
  AddNewTask: undefined;
  TaskList: undefined;
};

export type AppStackNavigation = NavigationProp<AppStackParamList>;

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
        name="Main"
        options={{ headerShown: false }}
        component={AppStackBottomTabNavigator}
      />
      <AppStack.Screen
        name="AddNewTask"
        options={{ headerShown: false }}
        component={AddNewTask}
      />
    </AppStack.Navigator>
  );
}
