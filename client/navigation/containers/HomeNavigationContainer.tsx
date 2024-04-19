import React from 'react';

import TimelineCalendarScreen from '../../screens/Calendar';
import Home from '../../screens/Home';
import SingleTaskScreen from '../../screens/SingleTask';
import TaskList from '../../screens/TaskList';
import { AppStack } from '../types';

export function HomeNavigationContainer() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true
      }}
    >
      <AppStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <AppStack.Screen name="Calendar" component={TimelineCalendarScreen} />
      <AppStack.Screen
        name="TaskList"
        options={{ headerShown: false }}
        component={TaskList}
      />
      <AppStack.Screen
        name="TaskDisplay"
        options={{ headerShown: false }}
        component={SingleTaskScreen}
      />
    </AppStack.Navigator>
  );
}
