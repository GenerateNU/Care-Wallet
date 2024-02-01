import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Router from './navigation/Router';
import UserContext from './contexts/userContext';

export default function App() {
  return (
    <UserContext>
      <SafeAreaView className="flex-1">
        <Router />
      </SafeAreaView>
    </UserContext>
  );
}
