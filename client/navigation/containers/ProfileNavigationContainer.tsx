import React from 'react';

import TimelineCalendarScreen from '../../screens/Calendar';
import FileUploadScreen from '../../screens/FileUpload';
import FileViewScreen from '../../screens/FileViewScreen';
import PatientView from '../../screens/Profile/PatientView';
import Profile from '../../screens/Profile/Profile';
import Settings from '../../screens/Profile/Settings';
import SingleTaskScreen from '../../screens/SingleTask';
import TaskList from '../../screens/TaskList';
import { AppStack } from '../types';

export function ProfileNavigationContainer() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true
      }}
    >
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="PatientView" component={PatientView} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="FileUploadScreen" component={FileUploadScreen} />
      <AppStack.Screen name="Calendar" component={TimelineCalendarScreen} />
      <AppStack.Screen name="TaskList" component={TaskList} />
      <AppStack.Screen name="TaskDisplay" component={SingleTaskScreen} />
      <AppStack.Screen name="FileViewScreen" component={FileViewScreen} />
    </AppStack.Navigator>
  );
}
