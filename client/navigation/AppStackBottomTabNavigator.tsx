import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Bell from '../assets/bottomNav/bell.svg';
import Calendar from '../assets/bottomNav/calendar.svg';
import Home from '../assets/bottomNav/home.svg';
import User from '../assets/bottomNav/user.svg';
import MedicationList from '../screens/MedicationList';
import Profile from '../screens/Profile';

const AppStackBottomTab = createBottomTabNavigator();

export function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator>
      <AppStackBottomTab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color="gray" />,
          tabBarLabel: () => <Text></Text>
        }}
        component={MedicationList}
      />
      <AppStackBottomTab.Screen
        name="Calendar"
        options={{
          headerShown: true,
          tabBarIcon: () => <Calendar color="gray" />,
          tabBarLabel: () => <Text></Text>
        }}
        component={MedicationList}
      />
      <AppStackBottomTab.Screen
        name="Notifications"
        options={{
          headerShown: true,
          tabBarIcon: () => <Bell color="gray" />,
          tabBarLabel: () => <Text></Text>
        }}
        component={MedicationList}
      />
      <AppStackBottomTab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: () => <User color="gray" />,
          tabBarLabel: () => <Text></Text>
        }}
        component={Profile}
      />
    </AppStackBottomTab.Navigator>
  );
}
