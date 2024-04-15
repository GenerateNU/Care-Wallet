import React from 'react';

import TimelineCalendarScreen from '../../screens/Calendar';
import SingleTaskScreen from '../../screens/SingleTask';
import TaskList from '../../screens/TaskList';
import { AppStack } from '../types';

export function CalendarNavigationContainer() {
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
