import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { useFilteredTasks } from '../services/task';

export default function TaskListScreen() {
  const [queryParams, setQueryParams] = useState({
    taskType: 'other'
  });

  const { tasks, tasksIsLoading } = useFilteredTasks(queryParams);

  return (
    <View style={styles.container}>
      {tasksIsLoading ? (
        <Text>Loading...</Text>
      ) : (
        tasks?.map((task, index) => {
          console.log('Task Object:', task);
          return (
            <View key={index}>
              <Text>{`Task ID: ${task?.task_id?.toString() || 'N/A'}`}</Text>
              <Text>{`Created By: ${task?.created_by || 'N/A'}`}</Text>
              <Text>{`Start Date: ${task?.start_date || 'N/A'}`}</Text>
              <Text>{`Task Status: ${task?.task_status || 'N/A'}`}</Text>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});
