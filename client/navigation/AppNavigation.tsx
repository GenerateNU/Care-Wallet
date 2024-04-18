import React from 'react';

import Dashboard from '../screens/Auth/Dashboard';
import LoginPage from '../screens/Auth/LoginPage';
import Register from '../screens/Auth/Register';
import TaskCreation from '../screens/TaskCreation';
import TaskType from '../screens/TaskType';
import { AppStackBottomTabNavigator } from './AppStackBottomTabNavigator';
import { AppStack } from './types';

export function AppNavigation() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true
      }}
    >
      <AppStack.Screen name="Dashboard" component={Dashboard} />
      <AppStack.Screen name="Login" component={LoginPage} />
      <AppStack.Screen name="Register" component={Register} />
      <AppStack.Screen name="Main" component={AppStackBottomTabNavigator} />
      <AppStack.Screen name="TaskType" component={TaskType} />
      <AppStack.Screen name="TaskCreation" component={TaskCreation} />
    </AppStack.Navigator>
  );
}
