import React from 'react';
import { Text, View } from 'react-native';

export function TaskInfoComponent({
  name,
  label,
  category,
  type,
  date
}: {
  name: string;
  label: string;
  category: string;
  type: string;
  date: Date;
}) {
  const formattedStartDate = date ? new Date(date).toLocaleDateString() : 'N/A';

  return (
    <View className="border-black bg-white mb-6 rounded-lg border p-4">
      <View className="mb-2 flex flex-row justify-between">
        <Text className="self-end font-bold">{`Task #${name}`}</Text>
        <Text className="self-start">{label}</Text>
      </View>
      <Text className="mt-3">{`${category} | ${type}`}</Text>
      <Text className="mt-3">{`${formattedStartDate}`}</Text>
    </View>
  );
}
