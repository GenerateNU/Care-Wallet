import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import MedicationList from '../screens/MedicationList';
import Home from '../assets/home.svg';

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
