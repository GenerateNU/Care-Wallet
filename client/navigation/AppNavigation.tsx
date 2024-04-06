import React from 'react';

import AddTaskDetails from '../screens/AddTaskDetails';
import LoginPage from '../screens/LoginPage';
import TaskCreation from '../screens/TaskCreation';
import TaskType from '../screens/TaskType';
import { AppStackBottomTabNavigator } from './AppStackBottomTabNavigator';
import { AppStack } from './types';

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
        name="TaskType"
        options={{ headerShown: false }}
        component={TaskType}
      />
      <AppStack.Screen
        name="TaskCreation"
        options={{ headerShown: false }}
        component={TaskCreation}
      />
      <AppStack.Screen
        name="AddTaskDetails"
        options={{ headerShown: false }}
        component={AddTaskDetails}
      />
    </AppStack.Navigator>
  );
}
