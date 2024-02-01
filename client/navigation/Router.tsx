import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppStack';

export default function Router() {
  // TODO: If we ever introduce onboarding questionairs and stuff, it can probably be another stack on this page (<OnboardingNavigation />)
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
