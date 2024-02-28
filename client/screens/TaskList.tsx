import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import TaskInfoComponent from '../components/TaskInfoCard';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { getTaskLabels, useFilteredTasks } from '../services/task';
import { Task } from '../types/task';
import FilterModal from '../components/FilterModal';

export default function TaskListScreen() {
  const { user, group } = useCareWalletContext();
  const [queryParams, setQueryParams] = useState({
    groupID: group.groupID?.toString() || '1'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [taskLabels, setTaskLabels] = useState<{ [taskId: string]: string[] }>(
    {}
  );
  const { tasks, tasksIsLoading } = useFilteredTasks(queryParams);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Fetch task labels for each task (2d array list)
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
  }, [tasks]);

  // Filter tasks based on search query in multiple fields and labels
  const filteredTasks = tasks?.filter((task) => {
    const taskFieldsMatch = [
      'task_id',
      'task_status',
      'task_type',
      'notes'
    ].some((field) =>
      task?.[field]
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    const labelMatch = taskLabels[task?.task_id?.toString()]?.some((label) =>
      label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return taskFieldsMatch || labelMatch;
  });

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
              category={`Category: ${task?.task_type || 'N/A'}`}
              type={`Task Status: ${task?.task_status || 'N/A'}`}
              date={task?.start_date ? new Date(task.start_date) : new Date()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => {
            setSearchQuery(text);
          }}
        />
           {/* Use the FilterButton component */}
        <Pressable
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </Pressable>
      </View>
      <Text className="text-xl font-bold text-carewallet-black">
        Task List (all tasks of all time)
      </Text>
      {renderSection(filteredTasks || [], 'All Tasks')}
      {renderSection(pastDueTasks || [], 'Past Due')}
      {renderSection(inProgressTasks || [], 'In Progress')}
      {renderSection(inFutureTasks || [], 'Future')}
      {renderSection(completeTasks || [], 'Done')}
      {renderSection(incompleteTasks || [], 'Marked as Incomplete')}
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
      />
    </ScrollView>
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
    borderRadius: 20,
    marginRight: 10,
    padding: 8,
    overflow: 'hidden'
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
