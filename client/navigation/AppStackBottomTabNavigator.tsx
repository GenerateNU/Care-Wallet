import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../assets/home.svg';
import GroupScreen from '../screens/Groups';
import MedicationList from '../screens/MedicationList';
import TaskList from '../screens/TaskList';

const AppStackBottomTab = createBottomTabNavigator();

export function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator>
      <AppStackBottomTab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color="gray" />,
          tabBarLabel: () => <Text>Landing</Text>
        }}
        component={MedicationList}
      />
      <AppStackBottomTab.Screen
        name="Group"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color="gray" />,
          tabBarLabel: () => <Text>Group</Text>
        }}
        component={GroupScreen}
      />
      <AppStackBottomTab.Screen
        name="TaskList"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color="gray" />,
          tabBarLabel: () => <Text>Tasks</Text>
        }}
        component={TaskList}
      />
    </AppStackBottomTab.Navigator>
  );
}
