import * as React from 'react';
import { View, Text } from 'react-native';
import { getAllMedications } from '../services/medication';
import { Medication } from '../types/medication';
import { useCareWalletContext } from '../contexts/CareWalletContext';

export default function MedList() {
  const [medications, setMedications] = React.useState<Medication[]>();
  const { user, group } = useCareWalletContext();
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
      {user && group && (
        <View>
          <Text>The user id is: {user.userID}</Text>
          <Text>The user email is: {user.userEmail}</Text>
          <Text>The group id is: {group.groupID}</Text>
          <Text>The group role is: {group.role}</Text>
        </View>
      )}
    </View>
  );
}
