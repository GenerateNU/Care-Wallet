import React from 'react';

import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../screens/LoginPage';
// import TaskDetails from '../screens/TaskDetails';
// import TaskList from '../screens/TaskList';
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
      {/* <AppStack.Screen
        name="TaskList"
        options={{ headerShown: false }}
        component={TaskList}
      />
      <AppStack.Screen
        name="TaskDetails"
        options={{ headerShown: false }}
        component={TaskDetails}
      /> */}
    </AppStack.Navigator>
  );
}
