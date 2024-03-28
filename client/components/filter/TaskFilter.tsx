import React, { useState } from 'react';
import { Text, View } from 'react-native';

import ArrowDown from '../../assets/arrowDown.svg';
import ArrowUp from '../../assets/arrowUp.svg';

export function TaskListFilter({
  title,
  items
}: {
  title: string;
  items?: { title: string; element: JSX.Element }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View className="mb-3">
      <View
        className="ml-5 flex flex-row items-center"
        onTouchEnd={() => setIsOpen(!isOpen)}
      >
        <Text className="mr-auto text-xl font-thin">{title}</Text>
        <View className="mr-10">{isOpen ? <ArrowUp /> : <ArrowDown />}</View>
      </View>
      <View className="mx-auto flex w-[90vw] max-w-[90vw] flex-row border border-carewallet-lightgray" />
      {isOpen && (
        <View className="ml-5 flex flex-row flex-wrap">
          {items?.map((item, index) => (
            <View key={index + title}>{item.element}</View>
          ))}
        </View>
      )}
    </View>
  );
}
