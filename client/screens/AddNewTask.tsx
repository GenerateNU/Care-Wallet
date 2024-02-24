import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { PopupModal } from '../components/PopupModal';
import { AppStackNavigation } from '../navigation/AppNavigation';
// import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useTask } from '../services/task';
import { Task } from '../types/task';

// const currentUserIDs = [useCareWalletContext().user.userID];
const currentUserIDs = ['0'];

export default function AddNewTask() {
  const navigation = useNavigation<AppStackNavigation>(); // Initialize navigation

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

  const [addingTask, setAddingTask] = useState(false);
  console.log(addingTask);
  const { addTaskMutation: addNewTaskMutation } = useTask(currentUserIDs);

  const handleAddTask = async () => {
    setAddingTask(true);
    await addNewTaskMutation(newTaskState);
    setAddingTask(false);
    navigation.navigate('TaskList'); // Navigate back to TaskList screen
  };

  // State to manage the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PopupModal isVisible={modalVisible} setVisible={setModalVisible}>
        <ActivityIndicator size="large" />
        <Text>Adding Task...</Text>
      </PopupModal>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Add New Task</Text>
      <View style={{ marginBottom: 10 }}>
        <Text>Task ID:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            fontSize: 18
          }}
          onChangeText={(val) =>
            setNewTaskState({ ...newTaskState, task_id: parseInt(val) || 0 })
          }
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Group ID:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            fontSize: 18
          }}
          onChangeText={(val) =>
            setNewTaskState({ ...newTaskState, group_id: parseInt(val) || 0 })
          }
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Created By:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            fontSize: 18
          }}
          onChangeText={(val) =>
            setNewTaskState({ ...newTaskState, created_by: val })
          }
        />
      </View>
      {/* Add input fields for other task fields (start_date, end_date, notes, task_status, task_type) similarly */}
      <Pressable
        onPress={handleAddTask}
        style={{
          backgroundColor: '#007bff',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Add Task</Text>
      </Pressable>
    </View>
  );
}
