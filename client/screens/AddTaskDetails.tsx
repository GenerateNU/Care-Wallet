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

const currentUserIDs = ['0']; // Assuming this is your current user ID array

export default function AddNewTask() {
  const navigation = useNavigation<AppStackNavigation>();

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
  const { addTaskMutation: addNewTaskMutation } =
    useTaskByAssigned(currentUserIDs);

  print(addingTask);

  const handleAddTask = async () => {
    setAddingTask(true);
    await addNewTaskMutation(newTaskState);
    setAddingTask(false);
    navigation.navigate('TaskList');
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="relative flex-1">
      <View className="absolute left-5 right-5 top-10">
        <PopupModal isVisible={modalVisible} setVisible={setModalVisible}>
          <ActivityIndicator size="large" />
          <Text>Adding Task...</Text>
        </PopupModal>
        <Text className="text-black font-inter text-2xl font-bold">
          Task Details
        </Text>

        <View className="mb-4 h-32 w-96 flex-col items-start justify-start">
          <Text className="text-black mb-1 text-base font-normal">
            Task ID:
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 5,
              fontSize: 18,
              width: '100%',
              marginBottom: 10
            }}
            onChangeText={(val) =>
              setNewTaskState({ ...newTaskState, task_id: parseInt(val) || 0 })
            }
            keyboardType="numeric"
          />
        </View>

        <Pressable
          onPress={handleAddTask}
          style={{
            backgroundColor: '#007bff',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center'
          }}
        >
          <Text className="text-white text-lg">Add Task</Text>
        </Pressable>
      </View>
    </View>
  );
}
