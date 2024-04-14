import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { clsx } from 'clsx';

import ArrowUp from '../assets/ArrowUp.svg';
import { AppStackNavigation } from '../navigation/types';
import { Status } from '../types/type';

export function DropUp({
  selected,
  items
}: {
  selected: string;
  items?: { label: Status; value: Status }[];
  setLabel?: (label: string) => void;
}) {
  const navigation = useNavigation<AppStackNavigation>();

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectItem = () => {
    setIsOpen(false);
    navigation.navigate('FileUploadScreen');
  };

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
          {items?.map(
            (item, index) =>
              item.label !== selected && (
                <View
                  key={index}
                  className="h-14 w-full justify-center border-t border-carewallet-blue/20"
                  onTouchEnd={() => handleSelectItem()}
                >
                  <Text className="w-40 text-ellipsis bg-carewallet-white pl-2 font-carewallet-manrope text-lg">
                    {item.label}
                  </Text>
                </View>
              )
          )}
          {selected !== 'Select Label' && (
            <View
              className="h-14 w-full justify-center border-t border-carewallet-blue/20"
              onTouchEnd={() => {
                setIsOpen(false);
              }}
            >
              <Text className="w-40 text-ellipsis bg-carewallet-white pl-2 font-carewallet-manrope text-lg">
                {''}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
