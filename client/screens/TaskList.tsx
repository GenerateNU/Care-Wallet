import React, { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import TaskInfoComponent from '../components/TaskInfoCard';
import { useFilteredTasks } from '../services/task';

export default function TaskListScreen() {
  const [queryParams, setQueryParams] = useState({
    taskType: 'other'
  });

  const { tasks, tasksIsLoading } = useFilteredTasks(queryParams);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => {
            // no impl
          }}
        />
        <Pressable
          style={styles.filterButton}
          onPress={() => {
            // no impl
          }}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </Pressable>
      </View>
      <Text className="text-xl font-bold text-carewallet-black">
        Task List (all tasks of all time)
      </Text>
      {tasksIsLoading ? (
        <Text>Loading...</Text>
      ) : (
        // Inside the tasks?.map(...) block
        tasks?.map((task, index) => {
          console.log('Task Object:', task);
          return (
            <TaskInfoComponent
              key={index}
              name={task?.task_id?.toString() || 'N/A'}
              label={`Label: ${task?.notes || 'N/A'}`}
              category={`Category: ${task?.notes || 'N/A'}`}
              type={`Task Status: ${task?.task_status || 'N/A'}`}
            />
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    padding: 8
  },
  filterButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 8
  },
  filterButtonText: {
    color: 'white'
  }
});
