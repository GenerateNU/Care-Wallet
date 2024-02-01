import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MedList from '../screens/Medication';
import { Text } from 'react-native';
import Home from '../assets/home.svg';

const AppStackBottomTab = createBottomTabNavigator();

export default function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator>
      <AppStackBottomTab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color={'gray'} />,
          tabBarLabel: () => <Text>Landing</Text>
        }}
        component={MedList}
      />
    </AppStackBottomTab.Navigator>
  );
}
