import * as React from 'react';
import { View, Text } from 'react-native';
import { getAllMedications } from './services/medication';
import UnionSvg from './assets/Union.svg';

import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Medication from './screens/Medication';
import Home from './assets/home.svg';

export type ScreenNames = ['BottomNav', 'Landing'];
export type RootStackParamList = Record<ScreenNames[number], any>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// TODO: figure out a way to do this better, I didnt enjoy this way of doing it in SaluTemp there HAS to be a better way
export default function App() {
  const [medications, setMedications] = React.useState<Medication[]>();
  React.useEffect(() => {
    getAllMedications().then((med) => setMedications(med));
  }, []);
  // Adding the UnionSvg component here to show that it's able to be displayed here
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNav"
          options={{ headerShown: false }}
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  return (
    <View className="flex-1 items-center w-[100vw] justify-center bg-white">
    {medications &&
      medications.map((med, index) => (
        <Text key={index} className="pb-2">
          {`Name: ${med.medication_name} id: ${med.medication_id}`}
        </Text>
      ))}
      <UnionSvg/>
  </View>
    <Tab.Navigator>
      <Tab.Screen
        name="Landing"
        options={{
          headerShown: true,
          tabBarIcon: () => <Home color={'gray'} />,
          tabBarLabel: () => <Text>Landing</Text>
        }}
        component={Medication}
      />
    </Tab.Navigator>
  );
}
