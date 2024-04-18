import React from 'react';

import TimelineCalendarScreen from '../../screens/Calendar';
import FileUploadScreen from '../../screens/FileUpload';
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
      <AppStack.Screen name="FileUploadScreen" component={FileUploadScreen} />
    </AppStack.Navigator>
  );
}
