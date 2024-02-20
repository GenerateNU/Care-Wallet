import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useTask } from '../services/task';
import { Task } from '../types/task';

export default function TaskList() {
  // Define state variables
  const [setSelectedTask] = useState<Task[]>([]);

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
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelectedTask(item)}>
          <View
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc'
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Task ID: {item.task_id}</Text>
            <Text>Start Date: {item.start_date}</Text>
            <Text>End Date: {item.end_date}</Text>
            <Text>Task Status: {item.task_status}</Text>
            <Text>Task Type: {item.task_type}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.task_id.toString()}
    />
  );
}
