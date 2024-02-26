import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import CheckMark from '../assets/checkmark.svg';
import Reject from '../assets/reject.svg';
import { BackButton } from '../components/BackButton';
import { getTaskId, getTaskLabel } from '../services/task';
import { Category } from '../types/type';

export default function SingleTaskScreen() {
  const [taskId] = useState<string>();

  // Would extract real information in future and not display default, placeholder info
  const [taskInfo, setTaskInfo] = useState({
    created_date: '8:00AM',
    task_id: '',
    task_info: '{}',
    task_type: 'Task Type Here',
    notes:
      'Description here. Description here. Description here. Description here. Description here. Description here. Description here. Description here. Description here. Description here. Description here.'
  });

  const [taskLabel, setTaskLabel] = useState<string>('Label Here');

  useEffect(() => {
    if (taskId) {
      getTaskId(taskId)
        .then((data) => {
          const { created_date, task_id, task_info, task_type, notes } = data;
          setTaskInfo({ created_date, task_id, task_info, task_type, notes });
        })
        .catch((error) => console.error('Error fetching task info:', error));
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      getTaskLabel(taskId)
        .then((data) => setTaskLabel(data))
        .catch((error) => console.error('Error fetching task label:', error));
    }
  }, [taskId]);

  const getCategoryFromTaskInfo = (taskInfo: string): Category => {
    try {
      // Parse the JSON string to object
      const taskInfoObject = JSON.parse(taskInfo);
      // Extract the category from the task info object
      const category = taskInfoObject.category;
      // Return the appropriate category enum value
      return Category[category as keyof typeof Category] || Category.ALL;
    } catch (error) {
      console.error(
        'Error parsing task info to extract category mapping:',
        error
      );
      return Category.ALL; // Return a default category in case of error
    }
  };

  const getTitleFromTaskInfo = (taskInfo: string): string => {
    try {
      // Parse the JSON string to object
      const taskInfoObject = JSON.parse(taskInfo);
      const title = taskInfoObject.title;
      return title;
    } catch (error) {
      console.error('Error parsing task info to extract title:', error);
      return '';
    }
  };

  return (
    <View className="flex flex-col items-start p-4">
      <View className="flex-row items-center">
        <BackButton />
      </View>
      <View className="mt-4">
        <Text className="text-base ">{taskLabel}</Text>
      </View>
      <View className="mt-4">
        <Text className="text-base ">
          {getCategoryFromTaskInfo(taskInfo.task_info) || 'Category Task'} |{' '}
          {taskInfo.task_type}
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-black font-inter text-2xl font-bold">
          {getTitleFromTaskInfo(taskInfo.task_info) || 'Doctor’s Appointment'}{' '}
          {'\n'} @ {taskInfo.created_date}
        </Text>
      </View>
      <View className="mt-2">
        <Text className="text-black font-inter text-base font-normal">
          {taskInfo.notes}
        </Text>
      </View>
      <View className="fixed bottom-0 right-0 flex flex-row-reverse">
        <Reject />
        <CheckMark />
      </View>
    </View>
  );
}
