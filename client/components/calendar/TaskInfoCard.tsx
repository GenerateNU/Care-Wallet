import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import Calendar from '../../assets/Date_today.svg';
import Time from '../../assets/Time.svg';
import { useTaskById } from '../../services/task';
import { TaskTypeDescriptions } from '../../types/type';

function statusToString(status: string) {
  return status === 'INCOMPLETE'
    ? 'bg-carewallet-pink'
    : status === 'COMPLETE'
      ? 'bg-carewallet-green'
      : status === 'INPROGRESS'
        ? 'bg-carewallet-yellow'
        : status === 'OVERDUE'
          ? 'bg-carewallet-orange'
          : 'bg-care-wallet-gray';
}

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
    <View className="bg-white mb-6 rounded-2xl border border-carewallet-gray p-4">
      <View className="mb-2 flex flex-col justify-between">
        <View className="flex-row items-center">
          <View className="flex flex-row items-center space-x-2">
            <Text className="font-carewallet-manrope-semibold text-xl">
              {name}
            </Text>
          </View>
          <View className="ml-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-lightgray px-2 py-1">
            <View
              className={`h-4 w-4 rounded-full ${statusToString(status)}`}
            />
            <Text className="font-carewallet-manrope">{`${status?.charAt(0)}${status?.slice(1).toLowerCase()}`}</Text>
          </View>
        </View>

        <View className="mt-3 flex flex-row space-x-2">
          <View className="flex flex-row items-center space-x-2">
            <Calendar />
            <Text className="font-carewallet-manrope">
              {moment(date).format('MMMM DD')}
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <Time />
            <Text className="font-carewallet-manrope">
              {moment(date).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </View>
      <View className="space-y-2">
        <View className="mr-auto flex flex-row items-center space-x-2 rounded-full border border-carewallet-lightgray px-2 py-1">
          <View className="h-4 w-4 rounded-full bg-carewallet-gray" />
          <Text className="font-carewallet-manrope">
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
        <View>
          {taskLabels?.map((label) => (
            <Text
              key={label.label_name + label.task_id}
              className="self-start font-carewallet-manrope"
            >
              {label.label_name}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
