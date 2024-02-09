import * as React from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { Medication } from '../types/medication';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import ClickableCard from '../components/ClickableCard';
import PopupModal from '../components/PopupModal';
import DocPickerButton from '../components/DocPickerButton';
import { Divider } from 'react-native-paper';
import { useState } from 'react';
import useMedication from '../services/medication';
import clsx from 'clsx';

export default function MedicationList() {
  const [selectedMed, setSelectedMed] = useState<Medication>();

  const [newMedState, setNewMedState] = useState({ id: '', name: '' });

  const [medVisible, setMedVisible] = useState<boolean>(false);
  const [newMedVisible, setNewMedVisible] = useState<boolean>(false);
  const [userGroupVisible, setUserGroupVisible] = useState<boolean>(false);

  const { user, group } = useCareWalletContext();

  const {
    medications,
    medicationsIsError,
    medicationsIsLoading,
    addMedicationMutation
  } = useMedication();

  if (medicationsIsLoading)
    return (
      <View className="text-3xl flex-1 items-center w-[100vw] justify-center bg-white">
        <Text className="text-3xl">Loading...</Text>
      </View>
    );

  if (medicationsIsError)
    return (
      <View className="text-3xl flex-1 items-center w-[100vw] justify-center bg-white">
        <Text className="text-xl">Could Not Load Medications List</Text>
      </View>
    );

  return (
    <View className="flex-1 items-center w-[100vw] justify-center bg-white">
      <PopupModal isVisible={medVisible} setVisible={setMedVisible}>
        <Text className="self-center text-3xl">
          {selectedMed?.medication_name}
        </Text>
        <Text className="self-center">ID: {selectedMed?.medication_id}</Text>
      </PopupModal>
      <PopupModal isVisible={newMedVisible} setVisible={setNewMedVisible}>
        <View className="items-center flex flex-row self-center space-x-2">
          <Text>ID:</Text>
          <TextInput
            className="self-center w-[50vw] border border-gray-300 text-3xl mb-3"
            onChangeText={(val) => setNewMedState({ ...newMedState, id: val })}
            value={newMedState.id}
          />
        </View>
        <View className="items-center flex flex-row self-center space-x-2">
          <Text>Name:</Text>
          <TextInput
            className="self-center w-[50vw] border border-gray-300 text-3xl mr-6"
            onChangeText={(val) =>
              setNewMedState({ ...newMedState, name: val })
            }
            value={newMedState.name}
          />
        </View>
        <Pressable
          className="pt-5 self-center"
          onPress={() => {
            addMedicationMutation({
              medication_id: parseInt(newMedState.id),
              medication_name: newMedState.name
            });
            setNewMedVisible(false);
          }}
        >
          <Text className="text-blue-500">Add Medication</Text>
        </Pressable>
      </PopupModal>
      <View className="flex flex-row items-center">
        <DocPickerButton />
        <Pressable
          className="border-l pl-2 border-gray-300"
          onPress={() => setNewMedVisible(true)}
        >
          <Text className="text-lg text-blue-600">Add Medication</Text>
        </Pressable>
      </View>
      <ScrollView>
        {medications &&
          medications.map((med, index) => (
            <View key={index}>
              <ClickableCard
                title={med.medication_name}
                onPress={() => {
                  setSelectedMed(med);
                  setMedVisible(true);
                }}
              >
                <Text
                  className={clsx(
                    'text-xl',
                    index % 2 == 0 ? 'text-blue-800' : 'text-red-400'
                  )}
                >
                  ID: {med.medication_id}
                </Text>
              </ClickableCard>
              {index !== medications.length - 1 ? <Divider /> : null}
            </View>
          ))}
      </ScrollView>

      <Pressable onPress={() => setUserGroupVisible(true)}>
        <Text className="text-lg text-blue-600">Show User and Group Info</Text>
      </Pressable>
      <PopupModal isVisible={userGroupVisible} setVisible={setUserGroupVisible}>
        <View>
          <Text className="self-start text-lg">User ID: {user.userID}</Text>
          <Text className="self-start text-lg">
            User Email: {user.userEmail}
          </Text>
          <Text className="self-start text-lg">Group ID: {group.groupID}</Text>
          <Text className="self-start text-lg">Group Role: {group.role}</Text>
        </View>
      </PopupModal>
    </View>
  );
}
