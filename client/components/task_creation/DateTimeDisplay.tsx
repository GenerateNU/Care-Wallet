import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DateTimeDisplayProps {
  title: string;
  elements: string[];
  onPress: () => void;
}

export function DateTimeDisplay({
  title,
  elements,
  onPress
}: DateTimeDisplayProps) {
  return (
    <TouchableOpacity
      className="flex h-12 flex-row items-center justify-between space-x-2 rounded-lg border border-carewallet-gray bg-carewallet-white px-4 py-2"
      onPress={onPress}
    >
      <Text className="font-carewallet-montserrat text-sm">{title}</Text>
      <View className="flex flex-row">
        {elements.map((element, index) => (
          <View
            key={index}
            className="ml-2 justify-center rounded-lg border border-carewallet-blue/20 bg-carewallet-blue/20 p-1 font-carewallet-montserrat text-sm"
          >
            <Text className="font-carewallet-montserrat-semibold text-sm text-carewallet-blue">
              {element}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}
