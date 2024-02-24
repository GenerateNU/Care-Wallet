import React, { useState } from 'react';
// Import useNavigation hook
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useCareWalletContext } from '../contexts/CareWalletContext';
import { AppStackNavigation } from '../navigation/AppNavigation';
import { useTask } from '../services/task';
import { Task } from '../types/task';

export default function TaskList() {
  // Define state variables
  const [setSelectedTask] = useState<Task[]>([]);
  console.log(setSelectedTask);
  const navigation = useNavigation<AppStackNavigation>(); // Initialize navigation

  // Current user & group
  const { user } = useCareWalletContext();

  // Fetch data using list of users (currently just the current user)
  const { tasks, tasksIsLoading, userHasTasks } = useTask([user.userID]);

  // Show tasks loading message
  if (tasksIsLoading)
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading Tasks...</Text>
      </View>
    );

  // Show could not load tasks message
  if (!tasks)
    if (!userHasTasks) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}
        >
          <Text style={{ fontSize: 20 }}>
            No Tasks Assigned to User. ID: {user.userID} Email: {user.userEmail}
          </Text>
        </View>
      );
    } else {
      return (
        <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
          <Text className="text-xl">Could Not Load Tasks List</Text>
        </View>
      );
    }

  // Task list
  return (
    <View>
      <View className="flex flex-row items-center">
        <Pressable
          onPress={() => navigation.navigate('AddNewTask')} // Navigate to AddNewTask screen
          className="mb-2 ml-2 mt-2 self-center rounded-md border border-carewallet-gray pl-1 pr-1"
        >
          <Text className="self-center text-lg text-carewallet-black">
            Add New Task
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc'
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>
                Task ID: {item.task_id}
              </Text>
              <Text>Start Date: {item.start_date}</Text>
              <Text>End Date: {item.end_date}</Text>
              <Text>Task Status: {item.task_status}</Text>
              <Text>Task Type: {item.task_type}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.task_id.toString()}
      />
    </View>
  );
}
