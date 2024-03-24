import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

import CheckMark from '../assets/checkmark.svg';
import Reject from '../assets/reject.svg';
import { BackButton } from '../components/BackButton';
import { useTaskById } from '../services/task';
import { Category, categoryToTypeMap, TypeOfTask } from '../types/type';

type ParamList = {
  mt: {
    id: string;
  };
};

export default function SingleTaskScreen() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { id } = route.params;
  console.log(id);
  const [open, setOpen] = useState(false);
  const [taskType, setTaskType] = useState<TypeOfTask>(TypeOfTask.ACTIVITIES);
  const { task, taskIsLoading, taskLabels, taskLabelsIsLoading } =
    useTaskById(id);

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

  if (taskIsLoading || taskLabelsIsLoading)
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading Task...</Text>
      </View>
    );

  if (!task) {
    <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
      <Text>Error Loading Task</Text>
    </View>;
  }

  return (
    <View className="flex flex-col items-start p-4">
      <View className="flex-row items-center">
        <BackButton />
      </View>
      <View className="absolute right-0 top-4 z-20 m-4">
        <DropDownPicker
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
          {task?.task_title} {'\n'} @{' '}
          {moment(task?.start_date).format('hh:mm A')}
        </Text>
        {taskLabels?.map((label) => (
          <Text key={label.task_id + label.label_name} className="text-base">
            {label.label_name || ''}
          </Text>
        ))}
        <Text className="text-base ">
          {getCategoryFromTaskType(taskType) || 'Category Task'} | {taskType}
        </Text>
      </View>
      <View className="mt-4"></View>

      <View className="mt-2">
        <Text className="text-black font-inter mb-4 text-base font-normal">
          {task?.notes}
        </Text>
        <Text className="text-black font-inter text-xl">Additional Notes</Text>
        <TextInput className="border-black mb-2 h-32 w-80 rounded-lg border-2" />
      </View>

      <View className="ml-auto flex-1 flex-row space-x-4">
        <CheckMark />
        <Reject />
      </View>
    </View>
  );
}
