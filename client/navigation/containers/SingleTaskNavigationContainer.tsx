import React from 'react';

import FileUploadScreen from '../../screens/FileUpload';
import { AppStack } from '../types';

export function SingleTaskNavigationContainer() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AppStack.Screen name="FileUploadScreen" component={FileUploadScreen} />
    </AppStack.Navigator>
  );
}
