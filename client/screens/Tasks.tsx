import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api_url } from '../services/api-links';
import { onAuthStateChanged } from '../services/auth/authState';
import { Task } from '../types/task';

const Tasks: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([
    // Hardcoded tasks for testing
    {
      task_id: 1,
      group_id: 1,
      created_by: 'John Doe',
      start_date: '2024-02-01',
      end_date: '2024-02-15',
      notes: 'Task 1: Complete project report',
      task_status: 'Pending',
      task_type: 'Project'
    },
    {
      task_id: 2,
      group_id: 1,
      created_by: 'Jane Smith',
      start_date: '2024-02-10',
      end_date: '2024-02-20',
      notes: 'Task 2: Review code changes',
      task_status: 'In Progress',
      task_type: 'Code Review'
    }
    // Add more tasks as needed
  ]);

  useEffect(() => {
    const fetchTasks = async (filterQuery: any) => {
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

    // Construct filter query object
    const filterQuery = {
      groupID: 'someGroupID', // Example: replace with actual filter criteria
      taskStatus: 'pending' // Example: replace with actual filter criteria
      // Add more filter criteria as needed...
    };

    // Use onAuthStateChanged to get the current user's ID
    onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid; // Assuming the user ID is stored in the 'uid' property
        fetchTasks({ ...filterQuery, userId }); // Include userId in the filter query
      } else {
        // Handle the case where the user is not authenticated
      }
    });
  }, []);

  // Handle task item click
  const handleTaskPress = (task: Task) => {
    //navigation.navigate('TaskDetailsScreen', { task });
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
};

export default Tasks;
