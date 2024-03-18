import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import CheckMark from '../assets/checkmark.svg';
import Reject from '../assets/reject.svg';
import { BackButton } from '../components/BackButton';
import { getTask, useGetTaskLabel } from '../services/task';
import { Task } from '../types/task';
import { Category, categoryToTypeMap, TypeOfTask } from '../types/type';

export default function SingleTaskScreen() {
  const [taskId] = useState('1');
  const [open, setOpen] = useState(false);
  const [taskType, setTaskType] = useState<TypeOfTask>(TypeOfTask.ACTIVITIES);
  const label = useGetTaskLabel(taskId);
  const [title, setTitle] = useState<string | null>(null);
  const [createdDate, setCreatedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>('');

  function formatTimestampToTime(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task: Task = await getTask(taskId);
        setTitle(task.task_title);
        setCreatedDate(formatTimestampToTime(task.created_date));
        setNotes(task.notes || '');
      } catch (error) {
        console.error('Failed to retrieve Task in Screen.', error);
      }
    };

    fetchTask();
  }, [taskId]); // Execute fetchTask when taskId changes

  // Gets category based on Task Type
  const getCategoryFromTaskType = (taskType: TypeOfTask): Category => {
    if (!taskType) {
      return Category.ALL; // Return a default category if taskType is undefined
    }
    // Iterate over each category in the categoryToTypeMap object
    for (const category in categoryToTypeMap) {
      // Check if the taskType exists in the current category's array of task types
      if (categoryToTypeMap[category as Category].includes(taskType)) {
        return category as Category; // Return the category if found
      }
    }
    return Category.ALL; // Return a default category if no match is found
  };

  return (
    <View className="flex flex-col items-start p-4">
      <View className="flex-row items-center">
        <BackButton />
      </View>
      <View className="absolute right-0 top-4 z-20 m-4">
        <DropDownPicker
          // Very light placeholder for the real dropdown picker. Once backend routes are added
          // to update a task status, then this can be dynamically rendered
          open={open}
          value="value"
          items={[
            { label: 'INCOMPLETE', value: 'incomplete' },
            { label: 'COMPLETE', value: 'Complete' },
            { label: 'PARTIAL', value: 'Partial' }
          ]}
          setOpen={setOpen}
          setValue={setTaskType}
          placeholder="To-do"
          containerStyle={{ height: 40, marginBottom: 8, width: 100 }}
          style={{ backgroundColor: 'lightgray', borderColor: 'gray' }}
        />
      </View>
      <View className="mt-4">
        <Text className="text-black font-inter text-2xl font-bold">
          {title || 'Doctor’s Appointment'} {'\n'} @ {createdDate}
        </Text>
        <Text className="text-base "> {label || ''}</Text>
        <Text className="text-base ">
          {getCategoryFromTaskType(taskType) || 'Category Task'} | {taskType}
        </Text>
      </View>
      <View className="mt-4"></View>

      <View className="mt-2">
        <Text className="text-black font-inter mb-4 text-base font-normal">
          {notes}
        </Text>
        <Text className="text-black font-inter text-xl">Additional Notes</Text>
        <TextInput className="border-black mb-2 h-32 w-80 rounded-lg border-2" />
      </View>

      <View className="ml-auto flex-1 flex-row space-x-4">
        {/* Once backend endpoints for assigning tasks are implemented, then can connect these buttons */}
        <CheckMark />
        <Reject />
      </View>
    </View>
  );
}
