import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AppStackNavigation } from '../navigation/types';
import { useTaskById } from '../services/task';

export function TaskInfoComponent({
  name,
  id,
  category,
  type,
  date
}: {
  id: number;
  name: string;
  category: string;
  type: string;
  date: Date;
}) {
  const navigator = useNavigation<AppStackNavigation>();
  const { taskLabels } = useTaskById(name);
  const formattedStartDate = date ? new Date(date).toLocaleDateString() : 'N/A';

  return (
    <View
      className="border-black bg-white mb-6 rounded-lg border p-4"
      onTouchEnd={() => navigator.navigate('TaskDisplay', { id: id })}
    >
      <View className="mb-2 flex flex-row justify-between">
        <Text className="self-end font-bold">{name}</Text>
        {taskLabels?.map((label) => (
          <Text key={label.label_name + label.task_id} className="self-start">
            {label.label_name}
          </Text>
        ))}
      </View>
      <Text className="mt-3">{`${category} | ${type}`}</Text>
      <Text className="mt-3">{`${formattedStartDate}`}</Text>
    </View>
  );
}
