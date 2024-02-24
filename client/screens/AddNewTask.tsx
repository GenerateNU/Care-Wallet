import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

import { PopupModal } from '../components/PopupModal';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useTask } from '../services/task';
import { Task } from '../types/task';

const currentUserIDs = [useCareWalletContext().user.userID];

export default function AddMedication() {
  const [newTaskState, setNewTaskState] = useState<Task>({
    task_id: 0,
    group_id: 0,
    created_by: '',
    start_date: '',
    end_date: '',
    notes: '',
    task_status: '',
    task_type: ''
  });
  const [addingMedication, setAddingMedication] = useState(false);

  const { addTaskMutation } = useTask(currentUserIDs);

  const handleAddMedication = async () => {
    setAddingMedication(true);
    await addTaskMutation({
      task_id: newTaskState.task_id,
      group_id: newTaskState.group_id,
      created_by: newTaskState.created_by,
      start_date: newTaskState.start_date,
      end_date: newTaskState.end_date,
      notes: newTaskState.notes,
      task_status: newTaskState.task_status,
      task_type: newTaskState.task_type
    });
    setAddingMedication(false);
    // Optionally, you can navigate to another page or perform any other actions after adding the medication
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PopupModal isVisible={addingMedication}>
        <ActivityIndicator size="large" />
        <Text>Adding Medication...</Text>
      </PopupModal>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Add New Medication</Text>
      <View style={{ marginBottom: 10 }}>
        <Text>ID:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            fontSize: 18
          }}
          onChangeText={(val) => setNewTaskState({ ...newTaskState, id: val })}
          value={newTaskState.id}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Name:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            fontSize: 18
          }}
          onChangeText={(val) =>
            setNewTaskState({ ...newTaskState, name: val })
          }
          value={newTaskState.name}
        />
      </View>
      <Pressable
        onPress={handleAddMedication}
        style={{
          backgroundColor: '#007bff',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Add Medication</Text>
      </Pressable>
    </View>
  );
}
