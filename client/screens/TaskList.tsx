import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import TaskInfoComponent from '../components/TaskInfoCard';
import { useFilteredTasks, getTaskLabels } from '../services/task';
import { Task } from '../types/task';

export default function TaskListScreen() {
  const [queryParams, setQueryParams] = useState({
    taskType: 'other'
  });

  const [taskLabels, setTaskLabels] = useState<{ [taskId: string]: string[] }>(
    {}
  ); // Store task labels in state

  // TODO: Query and assign task labels to tasks
  useEffect(() => {
    const fetchTaskLabels = async () => {
      const labels: { [taskId: string]: string[] } = {};
      if (tasks) {
        await Promise.all(
          tasks.map(async (task) => {
            const labelsForTask = await getTaskLabels(task.task_id.toString());
            labels[task.task_id.toString()] = labelsForTask.map(
              (label) => label.label_name
            );
          })
        );
      }
      setTaskLabels(labels);
    };
    if (tasks) {
      fetchTaskLabels();
    }
  });

  const { tasks, tasksIsLoading } = useFilteredTasks(queryParams);

  // Filter tasks based on categories
  const pastDueTasks = tasks?.filter(
    (task) => task?.end_date || '' < String(new Date())
  );
  const inProgressTasks = tasks?.filter(
    (task) => task?.task_status === 'PARTIAL'
  );
  const inFutureTasks = tasks?.filter(
    (task) => task?.start_date || '' > String(new Date())
  );
  const completeTasks = tasks?.filter(
    (task) => task?.task_status === 'COMPLETE'
  );
  const incompleteTasks = tasks?.filter(
    (task) => task?.task_status === 'INCOMPLETE'
  );

  const renderSection = (tasks: Task[], title: string) => {
    return (
      <View>
        <Text className="text-lg text-carewallet-black">{title}</Text>
        {tasks.map((task, index) => {
          return (
            <TaskInfoComponent
              key={index}
              name={task?.task_id?.toString() || 'N/A'}
              label={`Label: ${taskLabels[task.task_id.toString()]?.join(', ') || 'N/A'}`}
              category={`Category: ${task?.notes || 'N/A'}`}
              type={`Task Status: ${task?.task_status || 'N/A'}`}
            />
          );
        })}
      </View>
    );
  };

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
      {renderSection(pastDueTasks || [], 'Past Due')}
      {renderSection(inProgressTasks || [], 'In Progress')}
      {renderSection(inFutureTasks || [], 'Future')}
      {renderSection(completeTasks || [], 'Done')}
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
