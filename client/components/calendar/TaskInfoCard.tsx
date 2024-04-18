import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import Calendar from '../../assets/Date_today.svg';
import Time from '../../assets/Time.svg';
import { useTaskById } from '../../services/task';
import { TaskTypeDescriptions } from '../../types/type';

export function TaskInfoComponent({
  name,
  id,
  category,
  status,
  date
}: {
  id: number;
  name: string;
  category: string;
  status: string;
  date: Date;
}) {
  const { taskLabels } = useTaskById(id.toString());

  return (
    <View className="bg-white mb-6 rounded-lg border border-carewallet-black p-4">
      <View className="mb-2 flex flex-col justify-between">
        <Text className="self-start text-xl">{name}</Text>
        <View className="mt-3 flex flex-row space-x-10">
          <View className="flex flex-row items-center space-x-2">
            <Calendar />
            <Text>{moment(date).format('MMMM DD')}</Text>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <Time />
            <Text>{moment(date).format('hh:mm A')}</Text>
          </View>
        </View>
      </View>
      <View className="space-y-2">
        <View className="mr-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-black px-2 py-1">
          <View className="h-4 w-4 rounded-full bg-carewallet-gray" />
          <Text>{TaskTypeDescriptions[category]}</Text>
        </View>
        <View className="mr-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-black px-2 py-1">
          <View className="h-4 w-4 rounded-full bg-carewallet-gray" />
          <Text>{`${status?.charAt(0)}${status?.slice(1).toLowerCase()}`}</Text>
        </View>
        <View>
          {taskLabels?.map((label) => (
            <Text key={label.label_name + label.task_id} className="self-start">
              {label.label_name}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
