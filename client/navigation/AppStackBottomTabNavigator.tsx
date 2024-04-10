import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Bell from '../assets/bottom-nav/bell.svg';
import Calendar from '../assets/bottom-nav/calendar.svg';
import HomeIcon from '../assets/bottom-nav/home.svg';
import User from '../assets/bottom-nav/user.svg';
import TimelineCalendarScreen from '../screens/Calendar';
import FileUploadScreen from '../screens/FileUpload';
import Home from '../screens/Home';
import PatientView from '../screens/Profile/PatientView';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Profile/Settings';
import SingleTaskScreen from '../screens/SingleTask';
import TaskList from '../screens/TaskList';
import { AppStack } from './types';

const AppStackBottomTab = createBottomTabNavigator();

export function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator
      safeAreaInsets={{ top: 10 }}
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#D9D9D9',
        tabBarStyle: {
          backgroundColor: '#1A56C4'
        },
        unmountOnBlur: true
      }}
    >
      <AppStackBottomTab.Screen
        name="Landing"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={Home}
      />
      <AppStackBottomTab.Screen
        name="CalendarContainer"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Calendar color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={CalendarNavigationContainer}
      />
      <AppStackBottomTab.Screen
        name="Notifications"
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => <Bell color={color} />,
          tabBarLabel: () => <Text></Text>
        }}
        component={Home}
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
      <AppStack.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={Settings}
      />
      <AppStack.Screen
        name="FileUploadScreen"
        options={{ headerShown: false }}
        component={FileUploadScreen}
      />
    </AppStack.Navigator>
  );
}

function CalendarNavigationContainer() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AppStack.Screen name="Calendar" component={TimelineCalendarScreen} />
      <AppStack.Screen name="TaskList" component={TaskList} />
      <AppStack.Screen name="TaskDisplay" component={SingleTaskScreen} />
    </AppStack.Navigator>
  );
}
