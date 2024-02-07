import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  Pressable,
  TextInput
} from 'react-native';
import { Medication } from '../types/medication';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import ClickableCard from '../components/Card';
import PopupModal from '../components/PopupModal';
import DocPickerButton from '../components/DocPickerButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Divider } from 'react-native-paper';
import { useCallback, useState } from 'react';
import {
  addMedication,
  getAllMedications,
  useMedicationQuery
} from '../services/medication';

export default function MedList() {
  const [selectedMed, setSelectedMed] = useState<Medication>();
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [newMedVisible, setNewMedVisible] = useState<boolean>(false);

  const { user, group } = useCareWalletContext();
  const {
    medications,
    medicationsIsError,
    medicationsIsLoading,
    addMedicationMutation
  } = useMedicationQuery();

  const onListItemPress = (med: Medication) => {
    console.log(med.medication_id);
    setSelectedMed(med);
    setVisible(true);
  };

  const renderMedicationList = useCallback<ListRenderItem<Medication>>(
    ({ item }) => {
      return (
        <ClickableCard
          title={item.medication_name}
          onPress={() => onListItemPress(item)}
        >
          <Text>ID: {item.medication_id}</Text>
        </ClickableCard>
      );
    },
    [onListItemPress]
  );

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
      <PopupModal isVisible={visible} setVisible={setVisible}>
        <Text className="self-center text-3xl">
          {selectedMed?.medication_name}
        </Text>
        <Text className="self-center">ID: {selectedMed?.medication_id}</Text>
      </PopupModal>
      <PopupModal isVisible={newMedVisible} setVisible={setNewMedVisible}>
        <View className="items-center flex flex-row self-center space-x-2">
          <Text className="">ID:</Text>
          <TextInput
            keyboardType="numeric"
            className="self-center w-[50vw] border border-gray-300 text-3xl mb-3"
            onChangeText={(val) => setId(val)}
            value={`${id}`}
          />
        </View>
        <View className="items-center flex flex-row self-center space-x-2">
          <Text className="">Name:</Text>
          <TextInput
            className="self-center w-[50vw] border border-gray-300 text-3xl mr-6"
            onChangeText={(val) => setName(val)}
            value={`${name}`}
            inputMode="text"
          />
        </View>

        <Pressable
          className="pt-5 self-center"
          onPress={() => {
            addMedicationMutation({
              medication_id: parseInt(id),
              medication_name: name
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

      <FlatList
        data={medications}
        renderItem={renderMedicationList}
        keyExtractor={(item) => `id: ${item.medication_id}`}
        ItemSeparatorComponent={() => <Divider />}
      />
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
