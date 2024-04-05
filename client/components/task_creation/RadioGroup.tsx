import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import ButtonCircle from '../../assets/radio-button-circle.svg';

interface RadioGroupProps {
  title: string;
  options: string[];
  onChange?: (value: string) => void;
}

export function RadioGroup({ title, options, onChange }: RadioGroupProps) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    console.log('Selected option:', option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <View className="m-4 mb-0">
      <Text className="mb-2 font-carewallet-montserrat-semibold text-[14px]">
        {title.toUpperCase()}
      </Text>
      <View className="flex flex-row justify-between">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`flex h-12 flex-row items-center space-x-2 rounded-md border border-carewallet-gray px-4 py-2 ${option === selectedOption ? 'bg-carewallet-gray' : 'bg-carewallet-white'}`}
            onPress={() => {
              handleOptionSelect(option);
            }}
          >
            <ButtonCircle />
            <Text className="font-carewallet-manrope-semibold text-[16px]">
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
