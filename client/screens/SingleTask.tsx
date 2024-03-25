import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

import CheckMark from '../assets/checkmark.svg';
import Reject from '../assets/reject.svg';
import { BackButton } from '../components/nav_buttons/BackButton';
import { useTaskById } from '../services/task';
import { TaskTypeDescriptions, TypeToCategoryMap } from '../types/type';

type ParamList = {
  mt: {
    id: string;
  };
};

export default function SingleTaskScreen() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { id } = route.params;
  const [open, setOpen] = useState(false);
  const { task, taskIsLoading, taskLabels, taskLabelsIsLoading } =
    useTaskById(id);

  if (taskIsLoading || taskLabelsIsLoading)
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading Task...</Text>
      </View>
    );

  if (!task || task == undefined) {
    <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
      <Text>Error Loading Task</Text>
    </View>;
  }

  return (
    <View className="flex h-full flex-col items-start bg-carewallet-white p-4">
      <View className="w-[100vw] flex-row items-center">
        <BackButton />
        <View className="relative z-20 ml-auto mr-10 mt-4 w-24">
          <DropDownPicker
            open={open}
            value="value"
            items={[
              { label: 'Incomplete', value: 'INCOMPLETE' },
              { label: 'Complete', value: 'COMPLETE' },
              { label: 'Partial', value: 'PARTIAL' }
            ]}
            setOpen={setOpen}
            setValue={() => ''}
            placeholder="To-Do"
            style={{
              backgroundColor: 'lightgray',
              borderColor: 'gray',
              position: 'relative',
              zIndex: 10
            }}
          />
        </View>
      </View>
      <View className="mt-4">
        <Text className="font-inter text-2xl font-semibold text-carewallet-black">
          {task?.task_title}
        </Text>
        <Text className="font-inter pt-5 text-2xl font-semibold text-carewallet-black">
          {moment(task?.start_date).format('hh:mm A')}
          {task?.end_date && `- ${moment(task?.end_date).format('hh:mm A')}`}
        </Text>
        {taskLabels?.map((label) => (
          <Text key={label.task_id + label.label_name} className="text-base">
            {label.label_name || ''}
          </Text>
        ))}
        <Text className="text-base ">
          {task &&
            `${TypeToCategoryMap[task.task_type]} | ${TaskTypeDescriptions[task.task_type]}`}
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

      <View className="ml-auto mt-auto flex-1 flex-row space-x-4">
        <View className="mt-auto rounded-lg bg-carewallet-gray p-2">
          <CheckMark />
        </View>
        <View className="mt-auto rounded-lg bg-carewallet-gray p-2">
          <Reject />
        </View>
      </View>
    </View>
  );
}
