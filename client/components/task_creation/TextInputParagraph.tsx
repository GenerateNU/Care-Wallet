import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface TextInputParagraphProps {
  title: string;
}

export function TextInputParagraph({ title }: TextInputParagraphProps) {
  return (
    <View className="m-4 mb-0">
      <Text className="mb-2">{title}</Text>
      <TextInput
        style={{ height: 100 }}
        className="border-gray-300 w-full rounded-md border px-4 py-2"
        placeholder={'Fill in blank'}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
}
