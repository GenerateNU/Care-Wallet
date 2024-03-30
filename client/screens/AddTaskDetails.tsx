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
import { AppStackNavigation } from '../navigation/types';
import { useTaskByAssigned } from '../services/task';
import { Task } from '../types/task';

// const currentUserIDs = [useCareWalletContext().user.userID];
const currentUserIDs = ['0'];

export default function AddNewTask() {
  const navigation = useNavigation<AppStackNavigation>(); // Initialize navigation

  const [newTaskState, setNewTaskState] = useState<Task>({
    task_id: 0,
    task_title: '',
    group_id: 0,
    created_by: '',
    created_date: '',
    start_date: '',
    end_date: '',
    notes: '',
    task_status: '',
    task_type: ''
  });

  const [addingTask, setAddingTask] = useState(false);
  console.log(addingTask);
  const { addTaskMutation: addNewTaskMutation } =
    useTaskByAssigned(currentUserIDs);

  const handleAddTask = async () => {
    setAddingTask(true);
    await addNewTaskMutation(newTaskState);
    setAddingTask(false);
    navigation.navigate('TaskList'); // Navigate back to TaskList screen
  };

  // State to manage the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ position: 'absolute', top: '10%', left: 5, right: 5 }}>
        <PopupModal isVisible={modalVisible} setVisible={setModalVisible}>
          <ActivityIndicator size="large" />
          <Text>Adding Task...</Text>
        </PopupModal>
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Inter'
          }}
        >
          Task Details
        </Text>

        <View
          style={{
            width: 346,
            height: 125,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginBottom: 10
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: 'normal',
              fontFamily: 'Inter'
            }}
          >
            Task ID:
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 5,
              fontSize: 18,
              width: '100%', // Stretch the TextInput to the full width
              marginBottom: 10 // Add marginBottom to match the CSS styling
            }}
            onChangeText={(val) =>
              setNewTaskState({ ...newTaskState, task_id: parseInt(val) || 0 })
            }
            keyboardType="numeric"
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
    </View>
  );
}
