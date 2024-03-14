import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Bell from '../assets/bottom-nav/bell.svg';
import Calendar from '../assets/bottom-nav/calendar.svg';
import Home from '../assets/bottom-nav/home.svg';
import User from '../assets/bottom-nav/user.svg';
import MedicationList from '../screens/MedicationList';
import PatientView from '../screens/Profile/PatientView';
import Profile from '../screens/Profile/Profile';
import { AppStackParamList } from './AppNavigation';

const AppStackBottomTab = createBottomTabNavigator();

export function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray'
      }}
      backBehavior="history"
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
        component={MedicationList}
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
        component={AppNavigation}
      />
    </AppStackBottomTab.Navigator>
  );
}

const AppStack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigation() {
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
