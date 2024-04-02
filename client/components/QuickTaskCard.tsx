import React from 'react';
import { Text, View } from 'react-native';

import { CategoryIconsMap, TypeToCategoryMap } from '../types/type';

interface QuickTaskCardProps {
  name: string;
  label: string;
}

export function QuickTaskCard({
  name,
  label
}: QuickTaskCardProps): JSX.Element {
  return (
    <View className="mx-auto h-[10vh] w-[90vw] rounded-xl border border-carewallet-gray">
      <View className="flex flex-row items-center">
        <View className="mr-auto">
          <Text className="ml-2 mt-2 font-carewallet-manrope-semibold text-base">
            {name}
          </Text>
        </View>
        <View className="mr-2 mt-2">
          {CategoryIconsMap[TypeToCategoryMap[label]]}
        </View>
      </View>
    </View>
  );
}
