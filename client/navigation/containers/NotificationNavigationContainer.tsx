import React from 'react';

import Notifications from '../../screens/NotificationList';
import SingleTaskScreen from '../../screens/SingleTask';
import { AppStack } from '../types';

export function NotificationNavigationContainer() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AppStack.Screen
        name="Notifications"
        options={{ headerShown: false }}
        component={Notifications}
      />
      <AppStack.Screen
        name="TaskDisplay"
        options={{ headerShown: false }}
        component={SingleTaskScreen}
      />
    </AppStack.Navigator>
  );
}
