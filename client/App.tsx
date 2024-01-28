import * as React from 'react';
import { View, Text, LogBox } from 'react-native';
import { getAllMedications } from './services/medication';
import Calendar from './screens/Calendar';

LogBox.ignoreLogs([`to contain units`]);

export default function App() {
  const [medications, setMedications] = React.useState<Medication[]>();
  React.useEffect(() => {
    getAllMedications().then((med) => setMedications(med));
  }, []);
  // Adding the UnionSvg component here to show that it's able to be displayed here
  return (
    <View className="flex-1 items-center w-[100vw] justify-center bg-white">
      <Calendar />
    </View>
  );
}
