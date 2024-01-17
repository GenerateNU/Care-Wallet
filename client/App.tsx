import * as React from 'react';
import { View, Text } from 'react-native';
import { getAllMedications } from './services/medication';

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
