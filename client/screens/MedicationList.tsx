import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { clsx } from 'clsx';
import { Divider } from 'react-native-paper';

import { ClickableCard } from '../components/ClickableCard';
import { DocPickerButton } from '../components/DocPickerButton';
import { PopupModal } from '../components/PopupModal';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useMedication } from '../services/medication';
import { Medication } from '../types/medication';

export default function MedicationList() {
  const [selectedMed, setSelectedMed] = useState<Medication>();

  const [newMedState, setNewMedState] = useState({ id: '', name: '' });

  const [medVisible, setMedVisible] = useState<boolean>(false);
  const [newMedVisible, setNewMedVisible] = useState<boolean>(false);
  const [userGroupVisible, setUserGroupVisible] = useState<boolean>(false);

  const { user, group } = useCareWalletContext();

  const { medications, medicationsIsLoading, addMedicationMutation } =
    useMedication();

  if (medicationsIsLoading)
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-white text-3xl">
        <Text className="text-3xl">Loading...</Text>
      </View>
    );

  if (!medications)
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-white text-3xl">
        <Text className="text-xl">Could Not Load Medications List</Text>
      </View>
    );

  return (
    <View className="w-[100vw] flex-1 items-center justify-center bg-white">
      <PopupModal isVisible={medVisible} setVisible={setMedVisible}>
        <Text className="self-center text-3xl">
          {selectedMed?.medication_name}
        </Text>
        <Text className="self-center">ID: {selectedMed?.medication_id}</Text>
      </PopupModal>
      <PopupModal isVisible={newMedVisible} setVisible={setNewMedVisible}>
        <View className="flex flex-row items-center space-x-2 self-center">
          <Text>ID:</Text>
          <TextInput
            className="mb-3 w-[50vw] self-center border border-gray-300 text-3xl"
            onChangeText={(val) => setNewMedState({ ...newMedState, id: val })}
            value={newMedState.id}
          />
        </View>
        <View className="flex flex-row items-center space-x-2 self-center">
          <Text>Name:</Text>
          <TextInput
            className="mr-6 w-[50vw] self-center border border-gray-300 text-3xl"
            onChangeText={(val) =>
              setNewMedState({ ...newMedState, name: val })
            }
            value={newMedState.name}
          />
        </View>
        <Pressable
          className="self-center pt-5"
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
          className="border-l border-gray-300 pl-2"
          onPress={() => setNewMedVisible(true)}
        >
          <Text className="text-lg text-blue-600">Add Medication</Text>
        </Pressable>
      </View>
      <ScrollView>
        {medications.map((med, index) => (
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
