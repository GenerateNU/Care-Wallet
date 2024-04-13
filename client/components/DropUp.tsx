import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

import ArrowDown from '../assets/filledarrowdown.svg';

export function CWDropdown({
  selected,
  items,
  setLabel
}: {
  selected: string;
  items?: string[];
  setLabel: (label: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View className="mb-3">
      <View
        className={clsx(
          'flex h-14 w-full flex-row items-center rounded-lg bg-carewallet-blue/20',
          isOpen && 'rounded-b-none rounded-t-lg'
        )}
        onTouchEnd={() => setIsOpen(!isOpen)}
      >
        <Text className="w-40 pl-2 font-carewallet-manrope text-lg">
          {selected}
        </Text>
        <View className="absolute right-3">
          {isOpen ? (
            <View className="rotate-180">
              <ArrowDown color="black" />
            </View>
          ) : (
            <ArrowDown color="black" />
          )}
        </View>
      </View>
      {isOpen && (
        <View className="absolute top-14 flex flex-row flex-wrap rounded-b-lg border border-carewallet-blue/20 bg-carewallet-white">
          {selected !== 'Select Label' && (
            <View
              className="h-14 w-full justify-center border-t border-carewallet-blue/20"
              onTouchEnd={() => {
                setLabel('Select Label');
                setIsOpen(false);
              }}
            >
              <Text className="w-40 text-ellipsis bg-carewallet-white pl-2 font-carewallet-manrope text-lg">
                {''}
              </Text>
            </View>
          )}
          {items?.map(
            (item, index) =>
              item !== selected && (
                <View
                  key={index}
                  className="h-14 w-full justify-center border-t border-carewallet-blue/20"
                  onTouchEnd={() => {
                    setLabel(item);
                    setIsOpen(false);
                  }}
                >
                  <Text className="w-40 text-ellipsis bg-carewallet-white pl-2 font-carewallet-manrope text-lg">
                    {item}
                  </Text>
                </View>
              )
          )}
        </View>
      )}
    </View>
  );
}
