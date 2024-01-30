import * as React from 'react';
import { View, Text } from 'react-native';
import { getAllMedications } from './services/medication';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Medication from './screens/Medication';
import { Image } from 'react-native';

export type ScreenNames = ['Landing'];
export type RootStackParamList = Record<ScreenNames[number], any>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const favicon = require('./assets/favicon.png');

export default function App() {
  const [medications, setMedications] = React.useState<Medication[]>();
  React.useEffect(() => {
    getAllMedications().then((med) => setMedications(med));
  }, []);

  return (
    <View className="flex-1 items-center w-[100vw] justify-center bg-white">
      {medications &&
        medications.map((med, index) => (
          <Text key={index} className="pb-2">
            {`Name: ${med.medication_name} id: ${med.medication_id}`}
          </Text>
        ))}
    </View>
  );
}
