import React from 'react';
import { Text, View } from 'react-native';

interface TaskDetailsProps {
  route: {
    params: {
      task: {
        task_id: number;
        group_id: number;
        created_by: string;
        start_date: string;
        end_date: string;
        notes: string;
        task_status: string;
        task_type: string;
      };
    };
  };
}

// Define TaskDetails as a named function
function TaskDetails({ route }: TaskDetailsProps) {
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
}

export default TaskDetails;
