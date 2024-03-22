import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import Bell from '../assets/bottom-nav/bell.svg';
import Calendar from '../assets/bottom-nav/calendar.svg';
import Home from '../assets/bottom-nav/home.svg';
import User from '../assets/bottom-nav/user.svg';
import TimelineCalendarScreen from '../screens/Calendar';
import MedicationList from '../screens/MedicationList';
import PatientView from '../screens/Profile/PatientView';
import Profile from '../screens/Profile/Profile';
import TaskList from '../screens/TaskList';
import { AppStack } from './types';

const AppStackBottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

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
        name="CalendarTopNav"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Calendar color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={CalendarTopTapNavigator}
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

function CalendarTopTapNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TopTab.Navigator>
        <TopTab.Screen name="Calendar" component={TimelineCalendarScreen} />
        <TopTab.Screen name="TaskList" component={TaskList} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}
