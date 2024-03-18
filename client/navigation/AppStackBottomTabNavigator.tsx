import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Bell from '../assets/bottom-nav/bell.svg';
import Calendar from '../assets/bottom-nav/calendar.svg';
import Home from '../assets/bottom-nav/home.svg';
import User from '../assets/bottom-nav/user.svg';
import MedicationList from '../screens/MedicationList';
import PatientView from '../screens/Profile/PatientView';
import Profile from '../screens/Profile/Profile';
import { QuickTasks } from '../screens/QuickTasks';
import { AppStack } from './types';

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
        component={QuickTasks}
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
        name="ProfileScreens"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <User color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={ProfileNavigation}
      />
    </AppStackBottomTab.Navigator>
  );
}

export function ProfileNavigation() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
      <AppStack.Screen
        name="PatientView"
        options={{ headerShown: false }}
        component={PatientView}
      />
    </AppStack.Navigator>
  );
}
