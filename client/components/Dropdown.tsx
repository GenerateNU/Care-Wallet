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
        <Text className="w-40 pl-2 font-carewallet-montserrat-semibold text-sm text-carewallet-blue">
          {selected}
        </Text>
        <View className="absolute right-3">
          {isOpen ? (
            <View className="rotate-180">
              <ArrowDown />
            </View>
          ) : (
            <ArrowDown />
          )}
        </View>
      </View>
      <View className="flex w-[90vw] max-w-[90vw] flex-row" />
      {isOpen && (
        <View className="flex flex-row flex-wrap rounded-b-lg border border-carewallet-blue/20">
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
                  <Text className="w-40 text-ellipsis pl-2 font-carewallet-montserrat-semibold text-sm text-carewallet-blue">
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
