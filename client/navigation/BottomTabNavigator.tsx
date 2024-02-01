import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MedList from '../screens/Medication';
import { Text } from 'react-native';
import Home from '../assets/home.svg';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color={'gray'} />,
          tabBarLabel: () => <Text>Landing</Text>
        }}
        component={MedList}
      />
    </Tab.Navigator>
  );
}
