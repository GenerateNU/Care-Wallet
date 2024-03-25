import React from 'react';
import { Text, View } from 'react-native';

export function DropdownItem({ label }: { label: string }) {
  return (
    <View className="mb-10 flex flex-row items-center">
      <Text className="mr-10  text-lg text-carewallet-black">{label}</Text>
    </View>
  );
}
