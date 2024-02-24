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
import { Task } from '../types/task';

export default function TaskListScreen() {
  const [queryParams, setQueryParams] = useState({
    taskType: 'other'
  });

  const { tasks, tasksIsLoading } = useFilteredTasks(queryParams);

  // Filter tasks based on categories
  // const pastDueTasks = tasks?.filter((task) => /* your condition for past due tasks */);
  // const inProgressTasks = tasks?.filter((task) => /* your condition for in-progress tasks */);
  // const inFutureTasks = tasks?.filter((task) => /* your condition for in-future tasks */);
  const completeTasks = tasks?.filter((task) => task?.task_status === 'COMPLETE');
  const incompleteTasks = tasks?.filter((task) => task?.task_status === 'INCOMPLETE');

  const renderSection = (tasks: Task[], title: string) => {
    return (
      <View>
        <Text className="text-lg text-carewallet-black">
          {title}
        </Text>
        {tasks.map((task, index) => {
          return (
            <TaskInfoComponent
              key={index}
              name={task?.task_id?.toString() || 'N/A'}
              label={`Label: ${task?.notes || 'N/A'}`}
              category={`Category: ${task?.notes || 'N/A'}`}
              type={`Task Status: ${task?.task_status || 'N/A'}`}
            />
          );
        })}
      </View>
    )
  }

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
      {renderSection(completeTasks || [], "Done")}
      {renderSection(incompleteTasks || [], 'Marked as Incomplete')}
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
