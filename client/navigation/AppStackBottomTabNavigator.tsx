import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import MedicationList from '../screens/MedicationList';
import HomeIcon from '../assets/home.svg';
import CalendarIcon from '../assets/calendar.svg';
import Calendar from '../screens/Calendar';
import Calendar1 from '../screens/Calendar-1.0';
import TimelineCalendarScreen from '../screens/Calendar2.0';

const AppStackBottomTab = createBottomTabNavigator();

export function AppStackBottomTabNavigator() {
  return (
    <AppStackBottomTab.Navigator>
      <AppStackBottomTab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: () => <HomeIcon color={'gray'} />,
          tabBarLabel: () => <Text>Landing</Text>
        }}
        component={MedicationList}
      />
      <AppStackBottomTab.Screen
        name="Calendar -1.0"
        options={{
          headerShown: true,
          tabBarIcon: () => <CalendarIcon color={'gray'} />,
          tabBarLabel: () => <Text>Calendar -1.0</Text>
        }}
        component={Calendar1}
      />
      <AppStackBottomTab.Screen
        name="Calendar"
        options={{
          headerShown: true,
          tabBarIcon: () => <CalendarIcon color={'gray'} />,
          tabBarLabel: () => <Text>Calendar</Text>
        }}
        component={Calendar}
      />
      <AppStackBottomTab.Screen
        name="Calendar 2.0"
        options={{
          headerShown: true,
          tabBarIcon: () => <CalendarIcon color={'gray'} />,
          tabBarLabel: () => <Text>Calendar 2.0</Text>
        }}
        component={TimelineCalendarScreen}
      />
    </AppStackBottomTab.Navigator>
  );
}
