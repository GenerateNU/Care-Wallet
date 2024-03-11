import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Bell from '../assets/bottom-nav/bell.svg';
import Calendar from '../assets/bottom-nav/calendar.svg';
import Home from '../assets/bottom-nav/home.svg';
import User from '../assets/bottom-nav/user.svg';
import TimelineCalendarScreen from '../screens/Calendar3.0';
import MedicationList from '../screens/MedicationList';
import Profile from '../screens/Profile';

const AppStackBottomTab = createBottomTabNavigator();

export function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray'
      }}
    >
      <AppStackBottomTab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => <Home color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={MedicationList}
      />
      <AppStackBottomTab.Screen
        name="Calendar"
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => <Calendar color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={TimelineCalendarScreen}
      />
      <AppStackBottomTab.Screen
        name="Notifications"
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => <Bell color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={MedicationList}
      />
      <AppStackBottomTab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <User color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={Profile}
      />
    </AppStackBottomTab.Navigator>
  );
}
