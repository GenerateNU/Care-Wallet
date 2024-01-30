import * as React from 'react';
import { View, Text } from 'react-native';
import { getAllMedications } from './services/medication';
import UnionSvg from './assets/Union.svg';

export default function App() {
  const [medications, setMedications] = React.useState<Medication[]>();
  React.useEffect(() => {
    getAllMedications().then((med) => setMedications(med));
  }, []);
  // Adding the UnionSvg component here to show that it's able to be displayed here
  return (
    <View className="flex-1 items-center w-[100vw] justify-center bg-white">
      {medications &&
        medications.map((med, index) => (
          <Text key={index} className="pb-2">
            {`Name: ${med.medication_name} id: ${med.medication_id}`}
          </Text>
        ))}
      <UnionSvg />
    </View>
  );
}
