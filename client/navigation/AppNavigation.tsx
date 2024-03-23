import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import LoginPage from '../screens/LoginPage';
import SingleTaskScreen from '../screens/SingleTask';
import { TaskType } from '../screens/TaskType';
import { AppStackBottomTabNavigator } from './AppStackBottomTabNavigator';
import { AppStack } from './types';

export function AppNavigation() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
          name="TaskDisplay"
          options={{ headerShown: false }}
          component={SingleTaskScreen}
        />
      </AppStack.Navigator>
    </SafeAreaView>
  );
}
