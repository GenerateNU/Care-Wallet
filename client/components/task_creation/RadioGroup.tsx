import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import RadioButton from '../../assets/radio-button-ellipse.svg';

interface RadioGroupProps {
  title: string;
  options: string[];
  onChange?: (value: string) => void;
}

export function RadioGroup({ title, options, onChange }: RadioGroupProps) {
  const [, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <View className="m-4 mb-0">
      <Text className="mb-2">{title}</Text>
      <View className="flex flex-row justify-between">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className="border-gray-300 flex h-12 flex-row items-center space-x-2 rounded-md border px-4 py-2"
            onPress={() => handleOptionSelect(option)}
          >
            <RadioButton />
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
