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
        className="border-bottom border-1px ml-5 mt-3 flex flex-row items-center border-carewallet-gray border-opacity-5"
        onTouchEnd={() => setIsOpen(!isOpen)}
      >
        <Text className="mb-1 mr-auto font-carewallet-montserrat">{title}</Text>
        <View className="mr-10">{isOpen ? <ArrowUp /> : <ArrowDown />}</View>
      </View>
      {isOpen && (
        <View className="ml-5 flex flex-row flex-wrap">
          {items?.map((item, index) => (
            <View key={index + title}>{item.element}</View>
          ))}
        </View>
      )}
      <View className="border-t-0.5 mx-auto mt-2 flex w-[95vw] max-w-[95vw] flex-row border-carewallet-gray" />
    </View>
  );
}
