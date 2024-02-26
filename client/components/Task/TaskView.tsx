import React from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

export function TaskView() {
  const taskDates = [
    'task1',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2',
    'task2'
  ];

  return (
    <View className="mb-8 mt-8 flex flex-1 justify-between">
      {taskDates.map((task, index) => (
        <View
          key={index}
          className={clsx(
            'w-40 items-center rounded-lg p-4',
            index % 2 === 0 ? 'bg-blue-300' : 'bg-green-300'
          )}
        >
          <Text>{task}</Text>
        </View>
      ))}
    </View>
  );
}
