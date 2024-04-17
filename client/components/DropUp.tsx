import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { clsx } from 'clsx';

import ArrowUp from '../assets/ArrowUp.svg';
import { AppStackNavigation } from '../navigation/types';
import { useTaskByStatus } from '../services/task';
import { Status } from '../types/type';

export function DropUp({
  selected,
  items,
  taskId
}: {
  selected: string;
  items?: { label: Status; value: Status }[];
  setLabel?: (label: string) => void;
  taskId: string;
}) {
  const navigation = useNavigation<AppStackNavigation>();

  const [isOpen, setIsOpen] = useState(false);

  const { setTaskStatus } = useTaskByStatus(taskId);

  const handleSelectItem = async (selectedStatus: Status) => {
    setIsOpen(false);

    try {
      setTaskStatus(selectedStatus);

      navigation.navigate('FileUploadScreen');
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  console.log(items);

  return (
    <View className="relative mb-3">
      <View
        className={clsx(
          'flex h-14 w-full flex-row items-center rounded-lg bg-carewallet-blue/20',
          isOpen ? 'rounded-b-none' : 'rounded-t-lg'
        )}
        onTouchEnd={() => setIsOpen(!isOpen)}
      >
        <Text className="w-40 pl-2 font-carewallet-manrope text-lg">
          {selected}
        </Text>
        <View className="absolute right-3">
          {isOpen ? (
            <View className="rotate-180">
              <ArrowUp />
            </View>
          ) : (
            <ArrowUp />
          )}
        </View>
      </View>
      {isOpen && (
        <View className="absolute bottom-full flex flex-col-reverse flex-wrap rounded-b-lg border border-carewallet-blue/20 bg-carewallet-white">
          {items?.map((item, index) => (
            <View
              key={index}
              className="h-14 w-full justify-center border-t border-carewallet-blue/20"
              onTouchEnd={() => handleSelectItem(item.label)}
            >
              <Text className="w-40 text-ellipsis bg-carewallet-white pl-2 font-carewallet-manrope text-lg">
                {item.label}
              </Text>
            </View>
          ))}
          {selected === 'Select Label' && (
            <View
              className="h-14 w-full justify-center border-t border-carewallet-blue/20"
              onTouchEnd={() => {
                setIsOpen(false);
              }}
            >
              <Text className="w-40 text-ellipsis bg-carewallet-white pl-2 font-carewallet-manrope text-lg">
                {selected}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
