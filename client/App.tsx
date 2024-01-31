import * as React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './screens/Login';
import MedList from './screens/Medication';
import Home from './assets/home.svg';
import DocPickerButton from './components/DocPickerButton';

export type ScreenNames = ['BottomNav', 'Landing', 'TEMP-FileUpload', 'Login'];
export type RootStackParamList = Record<ScreenNames[number], any>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// TODO: figure out a way to do this better, I didnt enjoy this way of doing it in SaluTemp there HAS to be a better way
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: true }}
          component={LoginPage}
        />
        <Stack.Screen
          name="BottomNav"
          options={{ headerShown: false }}
          component={Tabs}
        />
        <Stack.Screen
          name="TEMP-FileUpload"
          options={{ headerShown: true }}
          component={DocPickerButton}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color={'gray'} />,
          tabBarLabel: () => <Text>Landing</Text>
        }}
        component={MedList}
      />
    </Tab.Navigator>
  );
}
