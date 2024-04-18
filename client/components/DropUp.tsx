import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { clsx } from 'clsx';
import _ from 'lodash';

import ArrowUp from '../assets/ArrowUp.svg';
import { AppStackNavigation } from '../navigation/types';
import { useTaskById } from '../services/task';
import { Status } from '../types/type';
import { StatusColor } from './GetStatusPill';

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
  const { updateTaskStatusMutation } = useTaskById(taskId);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectItem = async (selectedStatus: Status) => {
    setIsOpen(false);

    try {
      updateTaskStatusMutation(selectedStatus);
      if (selectedStatus === Status.COMPLETE) {
        navigation.navigate('FileUploadScreen');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <View className="mb-3 bg-carewallet-white">
      <View
        className={clsx(
          'flex h-14 w-full flex-row items-center rounded-lg border border-carewallet-lightgray'
        )}
        onTouchEnd={() => setIsOpen(!isOpen)}
      >
        <Text className="pl-5 font-carewallet-manrope-semibold text-sm">
          Actions
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
        <View className="absolute bottom-full mb-3 flex rounded-lg border border-carewallet-lightgray bg-carewallet-white">
          {items?.map((item, index) => {
            if (selected === item.label) return;
            return (
              <View
                key={index}
                className={clsx(
                  'flex h-14 w-[90vw] flex-row items-center border-b border-carewallet-lightgray',
                  items.length - 1 === index ? 'border-b-0' : ''
                )}
                onTouchEnd={() => handleSelectItem(item.label)}
              >
                <Text className="w-40 bg-carewallet-white pl-2 font-carewallet-manrope-semibold text-sm">
                  Mark as {_.toUpper(item.label.at(0))}
                  {_.toLower(item.label.substring(1))}
                </Text>
                <View
                  className={clsx(
                    'ml-auto mr-5 h-6 w-6 rounded-full',
                    StatusColor[item.label],
                    'border border-carewallet-lightgray'
                  )}
                />
              </View>
            );
          })}
          {selected === 'Select Label' && (
            <View
              className="h-14 w-full justify-center border-t border-carewallet-blue/20"
              onTouchEnd={() => {
                setIsOpen(false);
              }}
            >
              <Text className="w-40 text-ellipsis bg-carewallet-white pl-2 font-carewallet-manrope-semibold text-sm">
                {selected}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
