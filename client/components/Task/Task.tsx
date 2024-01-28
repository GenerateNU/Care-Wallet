import React from 'react';
import { View, Text } from 'react-native';

interface TaskProps {
  tasks: string[];
}

export default function Task(props: TaskProps) {
  const { tasks } = props;

  return (
    <View>
      <Text>Tasks for the selected date:</Text>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </View>
  );
}
