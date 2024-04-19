import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Bell from '../assets/bottom-nav/bell.svg';
import Calendar from '../assets/bottom-nav/calendar.svg';
import HomeIcon from '../assets/bottom-nav/home.svg';
import User from '../assets/bottom-nav/user.svg';
import { CalendarNavigationContainer } from './containers/CalendarNavigationContainer';
import { HomeNavigationContainer } from './containers/HomeNavigationContainer';
import { NotificationNavigationContainer } from './containers/NotificationNavigationContainer';
import { ProfileNavigationContainer } from './containers/ProfileNavigationContainer';

const AppStackBottomTab = createBottomTabNavigator();

export function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#D9D9D9',
        freezeOnBlur: true,
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
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <HomeIcon color={color} />
        }}
        component={HomeNavigationContainer}
      />
      <AppStackBottomTab.Screen
        name="CalendarContainer"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Calendar color={color} />,
          tabBarLabel: () => null
        }}
        component={CalendarNavigationContainer}
      />
      <AppStackBottomTab.Screen
        name="NotificationsContainer"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Bell color={color} />,
          tabBarLabel: () => null
        }}
        component={NotificationNavigationContainer}
      />
      <AppStackBottomTab.Screen
        name="ProfileScreens"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <User color={color} />,
          tabBarLabel: () => null
        }}
        component={ProfileNavigationContainer}
      />
    </AppStackBottomTab.Navigator>
  );
}
