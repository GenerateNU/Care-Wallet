import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface TextInputLineProps {
  title: string;
}

export function TextInputLine({ title }: TextInputLineProps) {
  return (
    <View className="m-4 mb-0">
      <Text className="mb-2">{title}</Text>
      <TextInput
        className="border-gray-300 w-full rounded-md border px-4 py-2"
        placeholder={'Fill in blank'}
      />
    </View>
  );
}
