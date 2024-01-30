import * as React from 'react';
import { View, Text } from 'react-native';
import { getAllMedications } from './services/medication';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Medication from './screens/Medication';
import { Image } from 'react-native';


export type ScreenNames = [
  'Landing'
];
export type RootStackParamList = Record<ScreenNames[number], any>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const favicon = require('./assets/favicon.png'); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" options={{ headerShown: true }} component={Tabs} />
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
          tabBarIcon: () => <Image source={require('./assets/favicon.png')} />,
          tabBarLabel: () => <Text> Care </Text>
        }}
        component={Medication}
      />
    </Tab.Navigator>
  );
}




