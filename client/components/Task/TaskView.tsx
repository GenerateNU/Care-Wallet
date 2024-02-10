import clsx from 'clsx';
import React from 'react';
import { View, Text } from 'react-native';

interface TaskProps {
  tasks?: string[];
}

// TODO: Doesnt matter rn, but we should think about if this should go to the calendar component folder or not... Since there will be a task screen showing tasks and such
export default function Task({ tasks }: TaskProps) {
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
    <View className="flex justify-between mt-8 mb-8 flex-1">
      {taskDates.map((task, index) => (
        <View
          key={index}
          className={clsx(
            'p-4 rounded-lg w-40 items-center',
            index % 2 === 0 ? 'bg-blue-300' : 'bg-green-300'
          )}
        >
          <Text>{task}</Text>
        </View>
      ))}
    </View>
  );
}
