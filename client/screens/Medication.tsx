import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getAllMedications } from '../services/medication';
import { Medication } from '../types/medication';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import ClickableCard from '../components/Card';
import PopupModal from '../components/PopupModal';
import DocPickerButton from '../components/DocPickerButton';

export default function MedList() {
  const [medications, setMedications] = React.useState<Medication[]>();
  const [selectedMed, setSelectedMed] = React.useState<Medication>();
  const { user, group } = useCareWalletContext();
  const [visible, setVisible] = React.useState<boolean>(false);
  React.useEffect(() => {
    getAllMedications().then((med) => setMedications(med));
  }, []);

  return (
    <View className="flex-1 items-center w-[100vw] justify-center bg-white">
      <PopupModal isVisible={visible} setVisible={setVisible}>
        <Text className="self-center text-3xl">
          {selectedMed?.medication_name}
        </Text>
        <Text className="self-center">ID: {selectedMed?.medication_id}</Text>
      </PopupModal>
      <DocPickerButton />
      <ScrollView>
        {medications &&
          medications.map((med, index) => (
            <ClickableCard
              key={index}
              title={med.medication_name}
              onPress={() => {
                setSelectedMed(med);
                setVisible(true);
              }}
            >
              <Text>ID: {med.medication_id}</Text>
            </ClickableCard>
          ))}
      </ScrollView>
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
