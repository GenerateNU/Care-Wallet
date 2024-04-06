import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface TextInputParagraphProps {
  title: string;
  onChange?: (value: string) => void;
}

export function TextInputParagraph({
  title,
  onChange
}: TextInputParagraphProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <View className="m-4 mb-0">
      <Text className="mb-2">{title}</Text>
      <TextInput
        style={{ height: 100 }}
        className="border-gray-300 w-full rounded-md border bg-carewallet-white px-4 py-2"
        placeholder={'Fill in blank'}
        multiline={true}
        numberOfLines={4}
        onChangeText={handleInputChange}
        value={inputValue}
      />
    </View>
  );
}
