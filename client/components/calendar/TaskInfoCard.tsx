import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import Calendar from '../../assets/Date_today.svg';
import Time from '../../assets/Time.svg';
import { useTaskById } from '../../services/task';
import {
  CategoryIconsMap,
  TaskTypeDescriptions,
  TypeToCategoryMap
} from '../../types/type';

function statusToString(status: string) {
  switch (status) {
    case 'INCOMPLETE':
      return 'bg-carewallet-pink';
    case 'COMPLETE':
      return 'bg-carewallet-green';
    case 'INPROGRESS':
      return 'bg-carewallet-yellow';
    case 'OVERDUE':
      return 'bg-carewallet-orange';
    default:
      return 'bg-care-wallet-gray';
  }
}

function categoryToColor(category: string) {
  switch (TaskTypeDescriptions[category]) {
    case 'Medication Management':
      return 'bg-carewallet-coral';
    case 'Doctor Appointment':
      return 'bg-carewallet-yellow';
    case 'Financial Task':
      return 'bg-carewallet-green';
    case 'OTHER':
      return 'bg-carewallet-blue';
    default:
      return 'bg-carewallet-gray';
  }
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
  const { task } = useTaskById(id.toString());
  const { taskLabels } = useTaskById(id.toString());

  console.log(task?.task_type);

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
        <View
          className={`mr-auto flex flex-row items-center space-x-2 rounded-full border ${categoryToColor(category)} border-carewallet-lightgray px-2 py-1`}
        >
          <View>
            {CategoryIconsMap[TypeToCategoryMap[task?.task_type ?? 'OTHER']]}
          </View>
          <Text className="font-carewallet-manrope">
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
        <View>
          {taskLabels?.map((label) => (
            <View
              key={label.label_name + label.task_id}
              className="mr-auto flex flex-row items-center rounded-full border border-carewallet-lightgray px-2 py-1"
            >
              <Text className="ml-1 self-start py-1 font-carewallet-manrope">
                {label.label_name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
