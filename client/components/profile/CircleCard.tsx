import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CircleCardProps {
  onTouchEnd?: () => void;
  ButtonText: string;
}
export function CircleCard({ onTouchEnd, ButtonText }: CircleCardProps) {
  return (
    <Pressable onTouchEnd={onTouchEnd}>
      <View className="h-10 w-80 flex-row items-center rounded-xl border border-carewallet-black">
        <View className="mx-3 h-5 w-5 rounded-full border border-carewallet-black bg-carewallet-gray" />
        <Text className="text-md">{ButtonText}</Text>
      </View>
    </Pressable>
  );
}
