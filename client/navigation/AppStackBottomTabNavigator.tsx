import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../assets/home.svg';
import MedicationList from '../screens/MedicationList';

const AppStackBottomTab = createBottomTabNavigator();

export function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator>
      <AppStackBottomTab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color={'gray'} />,
          tabBarLabel: () => <Text>Landing</Text>
        }}
        component={MedicationList}
      />
    </AppStackBottomTab.Navigator>
  );
}
