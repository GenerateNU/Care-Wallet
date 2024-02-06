import React from 'react';
import { View, Text } from 'react-native';
import { Task } from '../types/task';

const TaskDetails: React.FC<{ route: any }> = ({ route }) => {
  const { task } = route.params;

  // Display task details here
  return (
    <View>
      <Text>Task Details Screen</Text>
      <Text>Task ID: {task.task_id}</Text>
      <Text>Group ID: {task.group_id}</Text>
      <Text>Created By: {task.created_by}</Text>
      <Text>Start Date: {task.start_date}</Text>
      <Text>End Date: {task.end_date}</Text>
      <Text>Notes: {task.notes}</Text>
      <Text>Task Status: {task.task_status}</Text>
      <Text>Task Type: {task.task_type}</Text>
    </View>
  );
};

export default TaskDetails;
