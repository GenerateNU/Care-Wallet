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
  items?: { label: string; value: string }[];
  setLabel: ({ label, value }: { label: string; value: string }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View className="mb-3 bg-carewallet-white">
      {isOpen && (
        <View className="absolute bottom-14 z-50 flex flex-row flex-wrap rounded-lg border border-carewallet-blue/20 bg-carewallet-white">
          {selected !== 'Select Label' && (
            <View
              className="h-14 w-full justify-center rounded-lg border-t border-carewallet-blue/20"
              onTouchEnd={() => {
                setLabel({ label: 'Select', value: '' });
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
              item.label !== selected && (
                <View
                  key={index}
                  className="h-14 w-full justify-center rounded-lg border-t border-carewallet-blue/20 bg-carewallet-white"
                  onTouchEnd={() => {
                    setLabel(item);
                    setIsOpen(false);
                  }}
                >
                  <Text className="w-40 text-ellipsis bg-carewallet-white pl-2 font-carewallet-montserrat-semibold text-sm text-carewallet-blue">
                    {item.label}
                  </Text>
                </View>
              )
          )}
        </View>
      )}
      <View
        className={clsx(
          'flex h-14 w-full flex-row items-center rounded-lg bg-carewallet-blue/20'
        )}
        onTouchEnd={() => setIsOpen(!isOpen)}
      >
        <Text className="w-40 pl-2 font-carewallet-montserrat-semibold text-sm text-carewallet-blue">
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
    </View>
  );
}
