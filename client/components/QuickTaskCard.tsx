import React from 'react';
import { Text, View } from 'react-native';

import { TaskTypeDescriptions } from '../types/type';

interface QuickTaskCardProps {
  name: string;
  label: string;
}

export function QuickTaskCard({
  name,
  label
}: QuickTaskCardProps): JSX.Element {
  return (
    <View className="border-black h-[82px] w-[346px] self-center overflow-hidden rounded-[20px] border border-solid">
      <View className="relative left-[19px] top-[17px] h-[48px] w-[295px]">
        <View className="absolute left-0 top-0 h-[18px] w-[206px]">
          <Text className="text-black absolute left-0 top-[2px] w-[206px] whitespace-nowrap text-[18px] font-[400] leading-[22px] tracking-[0px]">
            {name}
          </Text>
        </View>
        <Text className="text-black absolute left-0 top-[29px] w-[295px] text-[14px] font-[400] leading-[17px] tracking-[0px]">
          {TaskTypeDescriptions[label]}
        </Text>
      </View>
    </View>
  );
}
