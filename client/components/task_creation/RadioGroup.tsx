import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import clsx from 'clsx';

import ButtonCircle from '../../assets/radio-button-circle.svg';
import Bathing from '../../assets/task-creation/bathing.svg';
import EventIcon from '../../assets/task-creation/event.svg';
import Liquid from '../../assets/task-creation/liquid.svg';
import Pill from '../../assets/task-creation/pill.svg';
import QuickTaskIcon from '../../assets/task-creation/quick-task.svg';
import Shot from '../../assets/task-creation/shot.svg';
import Toileting from '../../assets/task-creation/toileting.svg';

interface RadioGroupProps {
  title: string;
  options: string[];
  themeColor?: string;
  onChange?: (value: string) => void;
}

export function RadioGroup({
  title,
  options,
  themeColor,
  onChange
}: RadioGroupProps) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  const renderIcon = (option: string) => {
    switch (option) {
      case 'Pills':
        return (
          <Pill color={option === selectedOption ? '#FFFFFF' : '#FC2C51'} />
        );
      case 'Liquid':
        return (
          <Liquid color={option === selectedOption ? '#FFFFFF' : '#FC2C51'} />
        );
      case 'Shot':
        return (
          <Shot color={option === selectedOption ? '#FFFFFF' : '#FC2C51'} />
        );
      case 'Bathing':
        return (
          <Bathing color={option === selectedOption ? '#FFFFFF' : '#990099'} />
        );
      case 'Toileting':
        return (
          <Toileting
            color={option === selectedOption ? '#FFFFFF' : '#990099'}
          />
        );
      case 'Quick Task':
        return (
          <QuickTaskIcon
            color={option === selectedOption ? '#FFFFFF' : '#1A56C4'}
          />
        );
      case 'Event':
        return (
          <EventIcon
            color={option === selectedOption ? '#FFFFFF' : '#1A56C4'}
          />
        );
      default:
        return <ButtonCircle />;
    }
  };

  return (
    <View className="m-2 mb-0">
      <Text className="m-2 font-carewallet-montserrat-semibold">
        {title.toUpperCase()}
      </Text>
      <View className="flex flex-row justify-between">
        {options.map((option, index) => {
          return (
            <TouchableOpacity
              key={index}
              className={clsx(
                'm-2 flex h-12 flex-1 flex-row items-center space-x-2 rounded-md border border-carewallet-gray px-4 py-2',
                option === selectedOption ? themeColor : 'bg-carewallet-white'
              )}
              onPress={() => {
                handleOptionSelect(option);
              }}
            >
              {renderIcon(option)}
              <Text
                className={clsx(
                  'font-carewallet-montserrat-semibold text-base',
                  option === selectedOption
                    ? 'text-carewallet-white'
                    : 'text-carewallet-black'
                )}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
