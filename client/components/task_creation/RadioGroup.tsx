import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { clsx } from 'clsx';

import ButtonCircle from '../../assets/radio-button-circle.svg';
import Bathing from '../../assets/task-creation/bathing.svg';
import Liquid from '../../assets/task-creation/liquid.svg';
import Pill from '../../assets/task-creation/pill.svg';
import Shot from '../../assets/task-creation/shot.svg';
import Toileting from '../../assets/task-creation/toileting.svg';

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

  const renderIcon = (option: string) => {
    switch (option) {
      case 'Pills':
        return <Pill />;
      case 'Liquid':
        return <Liquid />;
      case 'Shot':
        return <Shot />;
      // bathing symbol needs to be fixed
      case 'Bathing':
        return <Bathing />;
      case 'Toileting':
        return <Toileting />;
      default:
        return <ButtonCircle />;
    }
  };

  return (
    <View className="m-4 mb-0">
      <Text className="mb-2 font-carewallet-montserrat-semibold">
        {title.toUpperCase()}
      </Text>
      <View className="flex flex-row justify-between">
        {options.map((option, index) => {
          return (
            <TouchableOpacity
              key={index}
              className={clsx(
                'flex h-12 flex-row items-center space-x-2 rounded-md border border-carewallet-gray px-4 py-2',
                option === selectedOption
                  ? 'bg-carewallet-lightgray'
                  : 'bg-carewallet-white'
              )}
              onPress={() => {
                handleOptionSelect(option);
              }}
            >
              {renderIcon(option)}
              <Text className="font-carewallet-montserrat-semibold text-base">
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
