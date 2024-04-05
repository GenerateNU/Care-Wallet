import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CircleCardProps {
  onTouchEnd?: () => void;
  ButtonText: string;
  Icon: JSX.Element;
}
export function CircleCard({ onTouchEnd, ButtonText, Icon }: CircleCardProps) {
  return (
    <Pressable onTouchEnd={onTouchEnd}>
      <View className="h-10 w-[80vw] flex-row items-center rounded-xl border border-carewallet-gray bg-carewallet-white">
        <View className="mx-3">{Icon}</View>

        <Text className="font-carewallet-manrope-semibold text-sm">
          {ButtonText}
        </Text>
      </View>
    </Pressable>
  );
}
