import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { TaskInfoComponent } from '../components/TaskInfoCard';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useFilteredTasks } from '../services/task';
import { Task } from '../types/task';

export default function NotificationScreen() {
  const { group } = useCareWalletContext();
  const [queryParams] = useState({
    groupID: group.groupID?.toString() || '-1'
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { tasks: fetchedTasks } = await useFilteredTasks({
        groupID: parseInt(queryParams.groupID)
      });
      if (fetchedTasks) {
        setTasks(fetchedTasks);
      }
    };

    fetchTasks();
  }, [queryParams]);

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Notification List
      </Text>
      {tasks.map((task, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <TaskInfoComponent
            id={task.task_id || 0} // Adjust this accordingly if task_id is of a different type
            name={task.task_name?.toString() ?? 'N/A'}
            category={task.task_type || 'N/A'}
            status={task.task_status || 'N/A'}
            date={task.start_date ? new Date(task.start_date) : new Date()}
          />
        </View>
      ))}
    </ScrollView>
  );
}
