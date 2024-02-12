import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { api_url } from '../services/api-links';
import { onAuthStateChanged } from '../services/auth';
import { Task } from '../types/task';

function Tasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async (filterQuery: Record<string, string>) => {
      try {
        const queryParams = new URLSearchParams(filterQuery).toString();
        const response = await fetch(
          `${api_url}/tasks/filtered?${queryParams}`
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    const filterQuery = {
      groupID: 'someGroupID', // Example: replace with actual filter criteria
      taskStatus: 'pending' // Example: replace with actual filter criteria
      // Add more filter criteria as needed...
    };

    onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        fetchTasks({ ...filterQuery, userId });
      } else {
        // Handle the case where the user is not authenticated
      }
    });
  }, []);

  const handleTaskPress = (task: Task) => {
    console.log('Task clicked:', task);
  };

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <TouchableOpacity
        onPress={() => handleTaskPress(item)}
        style={{ padding: 15 }}
      >
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Task ID: {item.task_id}</Text>
          <Text>Start Date: {item.start_date}</Text>
          <Text>End Date: {item.end_date}</Text>
          <Text>Task Status: {item.task_status}</Text>
          <Text>Task Type: {item.task_type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.task_id.toString()}
        />
      )}
    </View>
  );
}

export default Tasks;
