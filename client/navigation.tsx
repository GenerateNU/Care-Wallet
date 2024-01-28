import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import App from './App';

export type ScreenNames = [
  'Home',
  'Login',
  'Register',
  'MedicationOverview',
  'New',
  'MedList',
  'Scan',
  'ScanReview',
  'Email',
  'EmailAndPassword',
  'Name',
  'Password',
  'ForgotPassword',
  'Landing'
];
export type RootStackParamList = Record<ScreenNames[number], any>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={App}
          options={{
            title: 'Care-Wallet'
          }}
        />
        <Stack.Screen
          name="Email"
          component={null}
          options={{
            title: 'Email'
          }}
        />
        <Stack.Screen
          name="EmailAndPassword"
          component={null}
          options={{
            title: 'Login'
          }}
        />
        <Stack.Screen
          name="Name"
          component={null}
          options={{
            title: 'Name'
          }}
        />
        <Stack.Screen
          name="Password"
          component={null}
          options={{
            title: 'Password'
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={null}
          options={{
            title: 'Forgot Password'
          }}
        />
        <Stack.Screen
          name="Scan"
          component={null}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen
          name="ScanReview"
          component={null}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="MedList" options={{ headerShown: false }} component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor:  'black'}
      }}
    >
      <Tab.Screen
        name="Devices"
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarLabel: () => null
        }}
        component={null}
      />
      <Tab.Screen
        name="Medications"
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarLabel: () => null
        }}
        component={null}
      />
      <Tab.Screen
        name="Reminders"
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarLabel: () => null
        }}
        component={null}
      />
      <Tab.Screen
        name="MedicationOverview"
        options={{ tabBarButton: () => null, headerShown: false }}
        component={null}
      />
      <Tab.Screen
        name="New"
        options={{ tabBarButton: () => null, headerShown: false }}
        component={null}
      />
    </Tab.Navigator>
  );
}

